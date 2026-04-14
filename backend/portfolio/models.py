from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Project(models.Model):
    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    PROJECT_TYPE_CHOICES = [
        ('case_study', 'Case Study'),
        ('live_product', 'Live Product'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    role_label = models.CharField(max_length=120, blank=True)
    project_type = models.CharField(
        max_length=50,
        choices=PROJECT_TYPE_CHOICES,
        default='case_study',
    )
    overview_text = models.TextField(blank=True)
    challenge_text = models.TextField(blank=True)
    process_text = models.TextField(blank=True)
    solution_text = models.TextField(blank=True)
    outcome_summary = models.TextField(blank=True)
    outcome_quote = models.TextField(blank=True)
    outcome_attribution = models.CharField(max_length=150, blank=True)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')

    skills = models.ManyToManyField(Skill, blank=True, related_name='projects')
    github_link = models.URLField(blank=True, null=True)
    live_demo_link = models.URLField(blank=True, null=True)

    featured = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')

    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    IMAGE_KIND_CHOICES = [
        ('gallery', 'Gallery'),
        ('process', 'Process'),
        ('cover', 'Cover'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    kind = models.CharField(max_length=30, choices=IMAGE_KIND_CHOICES, default='gallery')
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"Image for {self.project.title} - Image {self.id}"
