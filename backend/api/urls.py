from django.urls import path

from .views import (
    upload_csv,
    parse_csv
)

urlpatterns = [

    path(
        'upload/',
        upload_csv
    ),

    path(
        'parse/',
        parse_csv
    ),
]