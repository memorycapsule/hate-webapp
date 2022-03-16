from django.urls import path
from .views import apiView

urlpatterns = [
    path('api', apiView.as_view()),
]
