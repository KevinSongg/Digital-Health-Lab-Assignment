from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # /users/add/
    path('add/', views.add, name='add'),
]
