from rest_framework.throttling import SimpleRateThrottle


class ContactSubmissionRateThrottle(SimpleRateThrottle):
    scope = "contact_submit"

    def get_cache_key(self, request, view):
        if request.method != "POST":
            return None

        forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "")
        ident = forwarded_for.split(",")[0].strip() if forwarded_for else request.META.get("REMOTE_ADDR")

        if not ident:
            return None

        return self.cache_format % {"scope": self.scope, "ident": ident}
