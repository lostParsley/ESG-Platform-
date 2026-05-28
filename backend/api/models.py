from django.db import models


class Tenant(models.Model):

    name = models.CharField(
        max_length=255
    )

    industry = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class UploadedFile(models.Model):

    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE,
        null=True
    )

    file = models.FileField(
        upload_to='uploads/'
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    status = models.CharField(
        max_length=50,
        default='uploaded'
    )


class ESGRecord(models.Model):

    category = models.CharField(
        max_length=255
    )

    value = models.FloatField()

    unit = models.CharField(
        max_length=50
    )

    normalized_value = models.FloatField()

    normalized_unit = models.CharField(
        max_length=50
    )

    scope = models.CharField(
        max_length=50
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


class AuditLog(models.Model):

    action = models.CharField(
        max_length=255
    )

    details = models.TextField()

    timestamp = models.DateTimeField(
        auto_now_add=True
    )