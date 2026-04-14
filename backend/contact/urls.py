app_name = "contact"

from django.urls import path

from .views import ContactMessageSubmissionView


urlpatterns = [
    path("submit", ContactMessageSubmissionView.as_view(), name="contact-submit"),
]
