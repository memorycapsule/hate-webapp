from django.urls import path
from .views import apiView

urlpatterns = [
    path('', apiView.as_view()),
    path('api', apiView.as_view() )
]
