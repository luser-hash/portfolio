from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSubmissionSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=254)
    message = serializers.CharField(min_length=20, max_length=5000, trim_whitespace=True)

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "source_page",
            "submitted_at",
        ]
        read_only_fields = ["id", "submitted_at"]
        extra_kwargs = {
            "name": {"max_length": 255, "trim_whitespace": True},
            "subject": {"max_length": 255, "trim_whitespace": True},
            "source_page": {"max_length": 255, "required": False, "allow_blank": True, "trim_whitespace": True},
        }


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "status",
            "is_read",
            "submitted_at",
            "replied_at",
            "source_page",
            "ip_address",
            "user_agent",
        ]
