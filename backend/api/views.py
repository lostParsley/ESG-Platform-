from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    UploadedFile,
    ESGRecord,
    AuditLog,
    Tenant
)

from .serializers import (
    ESGRecordSerializer
)

import pandas as pd


# =========================================
# UPLOAD CSV
# =========================================

@api_view(['POST'])
def upload_csv(request):

    file = request.FILES.get('file')

    if not file:

        return Response({
            "error": "No file uploaded"
        })

    tenant, _ = Tenant.objects.get_or_create(
        name="Default Tenant"
    )

    # SAVE FILE

    uploaded_file = UploadedFile.objects.create(

        tenant=tenant,

        file=file
    )

# READ DIRECTLY FROM MEMORY

    df = pd.read_csv(
            file,
            encoding='utf-8',
            on_bad_lines='skip'
        )

    # FILE PATH

    # file_path = uploaded_file.file.path

    try:

        # READ CSV

#         df = pd.read_csv(
#     file_path,
#     encoding='utf-8',
#     on_bad_lines='skip'
# )

        # HANDLE NaN

        df = df.fillna('')

    except Exception as e:

        return Response({
            "error": str(e)
        })

    # PREVIEW

    preview = df.head(5).to_dict(
        orient='records'
    )

    return Response({

        "message":
        "File Uploaded Successfully",

        "file_id":
        uploaded_file.id,

        "preview":
        preview
    })


# =========================================
# PARSE CSV
# =========================================

@api_view(['POST'])
def parse_csv(request):

    file_id = request.data.get(
        'file_id'
    )

    # SAFETY CHECK

    if not file_id:

        return Response({
            "error":
            "No uploaded file found"
        })

    # FILE EXISTENCE CHECK

    try:

        uploaded_file = UploadedFile.objects.get(
            id=file_id
        )

    except UploadedFile.DoesNotExist:

        return Response({
            "error":
            "Uploaded file does not exist"
        })

    # READ FILE

    file_path = uploaded_file.file.path

    try:

        df = pd.read_csv(
    file_path,
    encoding='utf-8',
    on_bad_lines='skip'
)

        df = df.fillna('')

    except Exception as e:

        return Response({
            "error": str(e)
        })

    # DEBUGGING

    print(df.columns)

    parsed_records = []

    # =====================================
    # LOOP THROUGH CSV ROWS
    # =====================================

    for _, row in df.iterrows():

        # DEFAULT VALUES

        category = 'unknown'

        value = 0

        unit = 'unknown'

        scope = 'Unknown'

        # =====================================
        # UTILITY DATASET
        # =====================================

        if 'Usage_Value' in df.columns:

            category = 'electricity'

            try:

                value = float(
                    row.get(
                        'Usage_Value',
                        0
                    )
                )

            except:

                value = 0

            unit = str(
                row.get(
                    'Usage_Unit',
                    'kWh'
                )
            ).lower()

            scope = 'Scope 2'

        # =====================================
        # SAP DATASET
        # =====================================

        elif 'Brennstoff' in df.columns:

            category = str(
                row.get(
                    'Brennstoff',
                    ''
                )
            ).lower()

            try:

                value = float(
                    row.get(
                        'Menge',
                        0
                    )
                )

            except:

                value = 0

            unit = str(
                row.get(
                    'Einheit',
                    'L'
                )
            ).lower()

            scope = 'Scope 1'

        # =====================================
        # TRAVEL DATASET
        # =====================================

        elif 'Travel_Type' in df.columns:

            category = str(
                row.get(
                    'Travel_Type',
                    ''
                )
            ).lower()

            try:

                value = float(
                    row.get(
                        'Distance_km',
                        0
                    )
                )

            except:

                value = 0

            unit = 'km'

            scope = 'Scope 3'

        # =====================================
        # NORMALIZATION
        # =====================================

        normalized_value = value

        normalized_unit = unit

        # ELECTRICITY

        if unit == 'mwh':

            normalized_value = value * 1000

            normalized_unit = 'kwh'

        # FUEL

        elif unit == 'gal':

            normalized_value = value * 3.785

            normalized_unit = 'L'

        # WEIGHT

        elif unit == 'ton':

            normalized_value = value * 1000

            normalized_unit = 'kg'

        # =====================================
        # SAVE ESG RECORD
        # =====================================

        record = ESGRecord.objects.create(

            category=category,

            value=value,

            unit=unit,

            normalized_value=
            normalized_value,

            normalized_unit=
            normalized_unit,

            scope=scope
        )

        parsed_records.append(record)

    # =====================================
    # AUDIT LOG
    # =====================================

    AuditLog.objects.create(

        action='CSV Parsed',

        details=
        f'{len(parsed_records)} ESG records parsed successfully'
    )

    # UPDATE STATUS

    uploaded_file.status = 'parsed'

    uploaded_file.save()

    # SERIALIZATION

    serializer = ESGRecordSerializer(

        parsed_records,

        many=True
    )

    # FINAL RESPONSE

    return Response({

        "message":
        "CSV Parsed Successfully",

        "records":
        serializer.data
    })