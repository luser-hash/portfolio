from django.db import migrations


def migrate_project_thumbnail_to_cover_image(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    ProjectImage = apps.get_model('portfolio', 'ProjectImage')

    for project in Project.objects.exclude(thumbnail='').exclude(thumbnail__isnull=True):
        has_cover_image = ProjectImage.objects.filter(project=project, kind='cover').exists()
        if has_cover_image:
            continue

        ProjectImage.objects.create(
            project=project,
            image=project.thumbnail.name,
            caption='',
            alt_text=f'{project.title} cover image',
            kind='cover',
            order=0,
        )


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_project_challenge_text_project_outcome_attribution_and_more'),
    ]

    operations = [
        migrations.RunPython(
            migrate_project_thumbnail_to_cover_image,
            migrations.RunPython.noop,
        ),
        migrations.RemoveField(
            model_name='project',
            name='thumbnail',
        ),
    ]
