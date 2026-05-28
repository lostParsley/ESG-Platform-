# MODEL.md

# ESG Data Platform — Data Model Design


The platform is designed to ingest ESG-related operational data from multiple enterprise systems, normalize it into a consistent structure, and provide analysts with a reviewable audit-ready workflow.

The system handles three major enterprise data sources:

* SAP fuel/procurement exports
* Utility electricity datasets
* Corporate travel datasets

The core challenge addressed by the platform is that every source has:

* different schemas
* different units
* inconsistent naming conventions
* different ESG semantics

The architecture focuses on:

* schema-aware ingestion
* normalization
* source traceability
* auditability
* analyst visibility

rather than generic CRUD functionality.

---

# Core Design Philosophy

The system was intentionally designed around the idea that:

> ESG ingestion is primarily a data consistency problem, not a storage problem.

Different enterprise systems export data in different formats. Instead of forcing one universal parser, the platform uses dataset-aware parsing and normalization pipelines.

The architecture prioritizes:

* explainability
* realistic ingestion workflows
* maintainability
* audit readiness

over feature quantity.

---

# Ingestion Workflow

The ingestion pipeline follows a staged workflow:

Upload CSV
↓
Store Raw File
↓
Generate Preview
↓
Detect Dataset Type
↓
Dataset-Specific Parsing
↓
Normalize Units
↓
Categorize ESG Scope
↓
Store ESG Records
↓
Create Audit Log
↓
Display Results Dashboard

This mirrors realistic enterprise ETL and analyst-review workflows.

---

# Multi-Tenancy

Each uploaded dataset belongs to a tenant/company.

This allows:

* logical data isolation
* future RBAC integration
* scalable enterprise onboarding

Example:

```python
class Tenant(models.Model):
    name
```

All uploaded files and ESG records are associated with a tenant.

---

# Entity Relationship Overview

Tenant
├── UploadedFile
│       └── ESGRecord
│               └── AuditLog

---

# Models

## 1. Tenant

Represents a company/client using the platform.

```python
class Tenant(models.Model):
    name
```

### Purpose

Supports:

* multi-tenancy
* enterprise isolation
* future role-based access control

---

## 2. UploadedFile

Represents an uploaded ingestion source.

```python
class UploadedFile(models.Model):

    tenant
    file
    uploaded_at
    status
```

### Status Values

| Status   | Meaning             |
| -------- | ------------------- |
| uploaded | File received       |
| parsed   | Successfully parsed |

### Why This Model Exists

Uploaded files are stored before parsing to preserve:

* source traceability
* parser reproducibility
* ingestion transparency

This also allows:

* reprocessing
* debugging
* future validation workflows

---

## 3. ESGRecord

Primary normalized ESG entity.

```python
class ESGRecord(models.Model):

    category

    value
    unit

    normalized_value
    normalized_unit

    scope

    created_at
```

This is the platform’s central business entity.

---

# Scope Categorization

The system automatically categorizes records into ESG scopes based on dataset type.

| Dataset             | Scope   |
| ------------------- | ------- |
| SAP fuel data       | Scope 1 |
| Utility electricity | Scope 2 |
| Corporate travel    | Scope 3 |

This categorization occurs during parsing.

---

# Dataset-Aware Parsing

The platform does not assume all uploaded files share the same schema.

Instead, the parser detects dataset type dynamically.

---

## Utility Dataset

Detected using:

```python
if 'Usage_Value' in df.columns
```

Mapped to:

* electricity activity
* Scope 2 emissions

---

## SAP Dataset

Detected using:

```python
elif 'Brennstoff' in df.columns
```

Mapped to:

* fuel activity
* Scope 1 emissions

---

## Travel Dataset

Detected using:

```python
elif 'Travel_Type' in df.columns
```

Mapped to:

* business travel activity
* Scope 3 emissions

---

# Why Conditional Parsing Was Important

Real enterprise systems rarely expose standardized ESG-ready schemas.

The ingestion problem is primarily:

* schema inconsistency
* inconsistent units
* source-specific semantics

The conditional parser architecture was designed to simulate realistic enterprise ingestion behavior instead of using a simplified generic parser.

---

# Unit Normalization

Enterprise datasets frequently contain inconsistent units.

Examples:

* MWh vs kWh
* Gallons vs Liters
* Tons vs Kilograms

The platform normalizes values during parsing.

Example:

```python
if unit == 'mwh':
    normalized_value = value * 1000
```

---

# Current Normalization Rules

| Source Unit | Target Unit |
| ----------- | ----------- |
| MWh         | kWh         |
| GAL         | Liters      |
| ton         | kg          |

This improves downstream consistency and dashboard readability.

---

## 4. AuditLog

Tracks ingestion activity.

```python
class AuditLog(models.Model):

    action
    details
    timestamp
```

### Current Logged Actions

* CSV parsing
* ESG record creation

### Purpose

Supports:

* ingestion traceability
* audit visibility
* parser monitoring

---

# Source-of-Truth Tracking

Every ESG record can be traced back to:

* uploaded source file
* ingestion event
* upload timestamp
* dataset type

This improves:

* explainability
* audit readiness
* ingestion transparency

---

# Frontend Workflow

The React frontend implements a staged analyst workflow:

Choose CSV
↓
Upload File
↓
Preview Data
↓
Parse CSV
↓
Normalization
↓
Results Dashboard

This design intentionally separates:

* ingestion
* validation visibility
* parsing

instead of automatically processing uploaded data immediately.

---

# Results Dashboard

The results dashboard displays:

* normalized ESG records
* scope categorization
* transformed units
* dataset outputs

The frontend was designed for analyst readability rather than marketing-oriented UI complexity.

---

# Architectural Tradeoffs

The prototype intentionally excludes:

* authentication
* async processing
* PDF ingestion
* OCR extraction
* emissions factor calculations
* approval locking workflows

These were intentionally omitted to focus on:

* ingestion realism
* parser correctness
* normalization architecture
* explainable data flows

within the assignment timeline.

---

# Conclusion

The platform was designed as a realistic ESG ingestion prototype focused on:

* heterogeneous enterprise data ingestion
* schema-aware parsing
* ESG normalization
* source traceability
* auditability
* explainable transformation pipelines

The architecture intentionally emphasizes data pipeline quality and ingestion realism over feature breadth.
