from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_projectimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='challenge_text',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='outcome_attribution',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='project',
            name='outcome_quote',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='outcome_summary',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='overview_text',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='process_text',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='project_type',
            field=models.CharField(
                choices=[('case_study', 'Case Study'), ('live_product', 'Live Product')],
                default='case_study',
                max_length=50,
            ),
        ),
        migrations.AddField(
            model_name='project',
            name='role_label',
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AddField(
            model_name='project',
            name='solution_text',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='projectimage',
            name='alt_text',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='projectimage',
            name='kind',
            field=models.CharField(
                choices=[('gallery', 'Gallery'), ('process', 'Process'), ('cover', 'Cover')],
                default='gallery',
                max_length=30,
            ),
        ),
    ]
