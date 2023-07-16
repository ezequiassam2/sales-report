from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('products', views.ProductList.as_view()),
    path('upload', views.TransactionsCreate.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
