import re
from pathlib import Path

from django.conf import settings
from rest_framework import serializers
from . import models


DJANGO_COLLISION_SUFFIX_PATTERN = re.compile(
    r'^(?P<base>.+)_(?P<suffix>[A-Za-z0-9]{7})(?P<ext>\.[^.]+)$'
)


def resolve_existing_media_name(field_file):
    storage = getattr(field_file, 'storage', None)
    name = getattr(field_file, 'name', '')
    if not storage or not name:
        return None

    if getattr(storage, 'remote_storage', False):
        return name

    try:
        if storage.exists(name):
            return name
    except OSError:
        return None

    match = DJANGO_COLLISION_SUFFIX_PATTERN.match(name)
    if not match:
        return None

    fallback_name = f"{match.group('base')}{match.group('ext')}"
    try:
        if storage.exists(fallback_name):
            return fallback_name
    except OSError:
        return None

    storage_location = getattr(storage, 'location', '')
    if not storage_location:
        return None

    fallback_filename = Path(fallback_name).name
    try:
        media_root = Path(getattr(settings, 'MEDIA_ROOT', storage_location)).resolve()
        candidates = [
            path for path in media_root.rglob(fallback_filename)
            if path.is_file()
        ]
    except OSError:
        return None

    if len(candidates) != 1:
        return None

    try:
        return candidates[0].resolve().relative_to(media_root).as_posix()
    except ValueError:
        return None

    return None


def build_absolute_media_url(request, field_file):
    if not field_file or not hasattr(field_file, 'url'):
        return None

    storage = getattr(field_file, 'storage', None)
    resolved_name = resolve_existing_media_name(field_file)
    if not storage or not resolved_name:
        return None

    media_url = storage.url(resolved_name)

    if request is None:
        return media_url

    try:
        return request.build_absolute_uri(media_url)
    except ValueError:
        return None
    return None


def normalize_section_content(value):
    return value.replace('\r\n', '\n').strip() if value else ''


def parse_legacy_project_sections(description):
    description = normalize_section_content(description)
    if not description:
        return {}

    section_pattern = (
        r'(overview|challenge|process|solution|outcome)\s*:?\s*'
        r'([\s\S]*?)(?=(?:^|\n)\s*(?:overview|challenge|process|solution|outcome)\s*:?\s*|\s*$)'
    )
    parsed_sections = {}

    for match in re.finditer(section_pattern, description, re.IGNORECASE):
        key = match.group(1).lower()
        value = normalize_section_content(match.group(2))
        if value:
            parsed_sections[key] = value

    return parsed_sections


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ['id', 'name', 'slug']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Skill
        fields = ['id', 'name']


class ProjectImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = models.ProjectImage
        fields = ['id', 'image', 'caption', 'alt_text', 'kind', 'order']

    def get_image(self, obj):
        request = self.context.get('request')
        return build_absolute_media_url(request, obj.image)


class AdjacentProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = ['slug', 'title']


def get_project_cover_image(project):
    cover_image = next(
        (image for image in project.images.all() if image.kind == 'cover'),
        None,
    )
    if cover_image:
        return cover_image

    return next(iter(project.images.all()), None)


# Serializer for the Project model, including nested serializers for category and skills 
class ProjectListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = models.Project
        fields = [
            'id', 'title', 'slug', 'short_description',
            'category', 'skills', 'thumbnail', 'github_link',
            'live_demo_link', 'featured', 'status', 'order',
            'created_at',
        ]

    # Method to get the full URL of the thumbnail image
    def get_thumbnail(self, obj):
        request = self.context.get('request')
        cover_image = get_project_cover_image(obj)
        return build_absolute_media_url(request, cover_image.image if cover_image else None)
    

class ProjectDetailSerializer(ProjectListSerializer):
    cover_image = serializers.SerializerMethodField()
    role_label = serializers.SerializerMethodField()
    project_type = serializers.SerializerMethodField()
    overview_text = serializers.SerializerMethodField()
    challenge_text = serializers.SerializerMethodField()
    process_text = serializers.SerializerMethodField()
    solution_text = serializers.SerializerMethodField()
    outcome_summary = serializers.SerializerMethodField()
    outcome_quote = serializers.SerializerMethodField()
    outcome_attribution = serializers.SerializerMethodField()
    images = ProjectImageSerializer(many=True, read_only=True)
    previous_project = serializers.SerializerMethodField()
    next_project = serializers.SerializerMethodField()

    class Meta(ProjectListSerializer.Meta):
        fields = [
            'id',
            'slug',
            'title',
            'short_description',
            'status',
            'role_label',
            'project_type',
            'category',
            'skills',
            'github_link',
            'live_demo_link',
            'cover_image',
            'overview_text',
            'challenge_text',
            'process_text',
            'solution_text',
            'outcome_summary',
            'outcome_quote',
            'outcome_attribution',
            'images',
            'previous_project',
            'next_project',
            'created_at',
            'updated_at',
        ]

    def _get_legacy_sections(self, obj):
        cache_name = '_legacy_sections_cache'
        cached = getattr(obj, cache_name, None)
        if cached is None:
            cached = parse_legacy_project_sections(obj.description)
            setattr(obj, cache_name, cached)
        return cached

    def _get_detail_value(self, obj, field_name, legacy_key=None, default=''):
        value = normalize_section_content(getattr(obj, field_name, ''))
        if value:
            return value

        legacy_sections = self._get_legacy_sections(obj)
        if legacy_key and legacy_sections.get(legacy_key):
            return legacy_sections[legacy_key]

        return default

    def _get_adjacent_project(self, obj, direction):
        siblings = self.context.get('_adjacent_projects_cache')
        if siblings is None:
            siblings = list(
                models.Project.objects.order_by('order', '-created_at').only('id', 'slug', 'title')
            )
            self.context['_adjacent_projects_cache'] = siblings
        if len(siblings) < 2:
            return None

        current_index = next(
            (index for index, project in enumerate(siblings) if project.pk == obj.pk),
            None,
        )
        if current_index is None:
            return None

        if direction == 'previous':
            adjacent = siblings[current_index - 1] if current_index > 0 else siblings[-1]
        else:
            adjacent = siblings[current_index + 1] if current_index < len(siblings) - 1 else siblings[0]

        if adjacent.pk == obj.pk:
            return None

        return AdjacentProjectSerializer(adjacent).data

    def get_cover_image(self, obj):
        request = self.context.get('request')
        cover_image = get_project_cover_image(obj)
        return build_absolute_media_url(request, cover_image.image if cover_image else None)

    def get_role_label(self, obj):
        return obj.role_label or (obj.category.name if obj.category else 'Project build')

    def get_project_type(self, obj):
        if obj.project_type:
            return obj.project_type
        return 'live_product' if obj.live_demo_link else 'case_study'

    def get_overview_text(self, obj):
        return self._get_detail_value(
            obj,
            'overview_text',
            legacy_key='overview',
            default=normalize_section_content(obj.description or obj.short_description),
        )

    def get_challenge_text(self, obj):
        return self._get_detail_value(obj, 'challenge_text', legacy_key='challenge')

    def get_process_text(self, obj):
        return self._get_detail_value(obj, 'process_text', legacy_key='process')

    def get_solution_text(self, obj):
        return self._get_detail_value(obj, 'solution_text', legacy_key='solution')

    def get_outcome_summary(self, obj):
        legacy_outcome = self._get_detail_value(obj, 'outcome_summary', legacy_key='outcome')
        if legacy_outcome:
            return legacy_outcome

        skills = list(obj.skills.all())
        parts = [
            obj.status and f"Status: {obj.status.replace('_', ' ')}",
            obj.category and f"Category: {obj.category.name}",
            skills and f"Core stack: {', '.join(skill.name for skill in skills)}",
        ]
        return '\n'.join(part for part in parts if part)

    def get_outcome_quote(self, obj):
        return self._get_detail_value(obj, 'outcome_quote')

    def get_outcome_attribution(self, obj):
        return obj.outcome_attribution or ''

    def get_previous_project(self, obj):
        return self._get_adjacent_project(obj, 'previous')

    def get_next_project(self, obj):
        return self._get_adjacent_project(obj, 'next')
