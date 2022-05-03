from django.urls import path
from .views import View, createCommentView

urlpatterns = [
    path('/update', createCommentView.as_view()),
    path('/', View.as_view()),
]