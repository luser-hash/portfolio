from django.urls import path
from .views import (
    HomeView,
    CategoryListView,
    SkillListView,
    ProjectListView,
    FeaturedProjectListView,
    ProjectDetailView
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/featured/', FeaturedProjectListView.as_view(), name='featured-project-list'),
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
]