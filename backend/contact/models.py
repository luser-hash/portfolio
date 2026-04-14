import uuid

from django.db import models
from django.utils import timezone


class ContactMessage(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        IN_PROGRESS = "in_progress", "In-Progress"
        RESOLVED = "resolved", "Resolved"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )
    is_read = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)
    replied_at = models.DateTimeField(null=True, blank=True)
    source_page = models.CharField(max_length=255, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    class Meta:
        ordering = ["is_read", "status", "-submitted_at"]
        indexes = [
            models.Index(fields=["status", "is_read"]),
            models.Index(fields=["-submitted_at"]),
        ]

    def __str__(self):
        return f"{self.subject} ({self.email})"

    def mark_resolved(self):
        self.status = self.Status.RESOLVED
        self.replied_at = self.replied_at or timezone.now()
        self.save(update_fields=["status", "replied_at"])
