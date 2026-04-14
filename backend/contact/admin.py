from django.contrib import admin

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "email",
        "subject",
        "status",
        "is_read",
        "source_page",
        "submitted_at",
        "replied_at",
    ]
    list_filter = ["status", "is_read", "submitted_at", "replied_at"]
    search_fields = ["name", "email", "subject", "message", "source_page", "ip_address"]
    readonly_fields = ["id", "submitted_at", "ip_address", "user_agent"]
    ordering = ["is_read", "status", "-submitted_at"]
    list_select_related = []

    fieldsets = (
        (
            "Message",
            {
                "fields": ("id", "name", "email", "subject", "message"),
            },
        ),
        (
            "Workflow",
            {
                "fields": ("status", "is_read", "submitted_at", "replied_at"),
            },
        ),
        (
            "Request Metadata",
            {
                "fields": ("source_page", "ip_address", "user_agent"),
            },
        ),
    )
