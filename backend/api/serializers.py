from rest_framework import serializers

from .models import ESGRecord


class ESGRecordSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = ESGRecord

        fields = "__all__"