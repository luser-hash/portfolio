import uuid

from django.test import TestCase
from django.core.cache import cache
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from .models import ContactMessage


class ContactMessageModelTests(TestCase):
    def test_defaults_are_set_for_new_message(self):
        message = ContactMessage.objects.create(
            name="Jane Doe",
            email="jane@example.com",
            subject="New project inquiry",
            message="I would like to discuss a backend project.",
        )

        self.assertIsInstance(message.id, uuid.UUID)
        self.assertEqual(message.status, ContactMessage.Status.PENDING)
        self.assertFalse(message.is_read)
        self.assertIsNotNone(message.submitted_at)
        self.assertIsNone(message.replied_at)

    def test_mark_resolved_sets_status_and_reply_time(self):
        message = ContactMessage.objects.create(
            name="Jane Doe",
            email="jane@example.com",
            subject="Follow-up",
            message="Checking your availability.",
        )

        message.mark_resolved()
        message.refresh_from_db()

        self.assertEqual(message.status, ContactMessage.Status.RESOLVED)
        self.assertIsNotNone(message.replied_at)
        self.assertLessEqual(message.replied_at, timezone.now())


class ContactMessageSubmissionApiTests(APITestCase):
    def setUp(self):
        cache.clear()
        self.url = reverse("contact:contact-submit")
        self.payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "subject": "Backend collaboration",
            "message": "I would like to discuss building a secure Django API for my site.",
            "source_page": "/contact",
        }

    def test_public_submission_creates_message_and_captures_request_metadata(self):
        response = self.client.post(
            self.url,
            self.payload,
            format="json",
            HTTP_USER_AGENT="PortfolioFrontend/1.0",
            HTTP_X_FORWARDED_FOR="203.0.113.10, 70.41.3.18",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

        message = ContactMessage.objects.get()
        self.assertEqual(message.status, ContactMessage.Status.PENDING)
        self.assertFalse(message.is_read)
        self.assertEqual(message.ip_address, "203.0.113.10")
        self.assertEqual(message.user_agent, "PortfolioFrontend/1.0")

    def test_submission_rejects_invalid_email_and_short_message(self):
        response = self.client.post(
            self.url,
            {
                **self.payload,
                "email": "invalid-email",
                "message": "Too short",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
        self.assertIn("message", response.data)

    def test_submission_is_rate_limited(self):
        responses = [
            self.client.post(self.url, self.payload, format="json", REMOTE_ADDR="198.51.100.25")
            for _ in range(6)
        ]

        for response in responses[:5]:
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(responses[5].status_code, status.HTTP_429_TOO_MANY_REQUESTS)
