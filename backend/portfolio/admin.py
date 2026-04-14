from django.contrib import admin
from .models import Category, Skill, Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ['image', 'caption', 'alt_text', 'kind', 'order']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'category', 'project_type', 'status', 'featured', 'order', 'created_at']
    list_filter = ['featured', 'status', 'category', 'skills']
    search_fields = ['title', 'short_description', 'description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['skills']
    inlines = [ProjectImageInline]
    fieldsets = (
        ('Core', {
            'fields': (
                'title',
                'slug',
                'short_description',
                'description',
                'category',
                'skills',
                'github_link',
                'live_demo_link',
                'featured',
                'status',
                'order',
            )
        }),
        ('Project Details', {
            'fields': (
                'role_label',
                'project_type',
                'overview_text',
                'challenge_text',
                'process_text',
                'solution_text',
                'outcome_summary',
                'outcome_quote',
                'outcome_attribution',
            )
        }),
    )


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'project', 'kind', 'caption', 'order', 'created_at']
    list_filter = ['project', 'kind']
