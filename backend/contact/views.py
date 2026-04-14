import ipaddress

from rest_framework import generics, permissions

from .models import ContactMessage
from .serializers import ContactMessageSubmissionSerializer
from .throttles import ContactSubmissionRateThrottle


def get_client_ip(request):
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded_for:
        candidate = forwarded_for.split(",")[0].strip()
    else:
        candidate = request.META.get("REMOTE_ADDR")

    if not candidate:
        return None

    try:
        return str(ipaddress.ip_address(candidate))
    except ValueError:
        return None


class ContactMessageSubmissionView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ContactSubmissionRateThrottle]

    def perform_create(self, serializer):
        serializer.save(
            ip_address=get_client_ip(self.request),
            user_agent=(self.request.headers.get("User-Agent", "") or "")[:1000],
        )
