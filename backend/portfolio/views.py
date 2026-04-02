from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from . import serializers
from . import models


class HomeView(APIView):
    def get(request, *kwargs):
        return Response({
            "message": "Portfolio API is working"
        })


# Category List View
class CategoryListView(ListAPIView):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()


# Skill List View
class SkillListView(ListAPIView):
    serializer_class = serializers.SkillSerializer
    queryset = models.Skill.objects.all()


# Project List View with optimized queries using select_related and prefetch_related
# support query params for filtering by category, skills, feature status
class ProjectListView(ListAPIView):
    serializer_class = serializers.ProjectListSerializer

    def get_queryset(self):
        queryset = models.Project.objects.select_related('category').prefetch_related('skills').all()

        search = self.request.query_params.get('search', '').strip()
        category = self.request.query_params.get('category', '').strip()
        status_value = self.request.query_params.get('status', '').strip()

        if search:
            queryset = queryset.filter(title__icontains=search)

        if category:
            queryset = queryset.filter(category__slug=category)

        if status_value:
            queryset = queryset.filter(status=status_value)

        return queryset


# Featured Project List View with optimized queries using select_related and prefetch_related
class FeaturedProjectListView(ListAPIView):
    serializer_class = serializers.ProjectListSerializer
    queryset = models.Project.objects.filter(featured=True).select_related('category').prefetch_related('skills')


# Project Detail View with optimized queries using select_related and prefetch_related
class ProjectDetailView(RetrieveAPIView):
    serializer_class = serializers.ProjectDetailSerializer
    queryset = models.Project.objects.select_related('category').prefetch_related('skills').all()
    lookup_field = 'slug'
