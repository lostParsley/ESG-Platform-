# ESG Data Platform

A Django REST Framework + React based ESG ingestion platform designed to simulate realistic enterprise sustainability data workflows.

The platform ingests heterogeneous enterprise datasets, normalizes inconsistent operational data, categorizes records into ESG scopes, and provides an analyst-friendly review dashboard.

---

# Objective

Enterprise ESG data rarely comes in clean or standardized formats.

Different systems expose:

* different schemas
* different units
* inconsistent naming conventions
* source-specific semantics

This project focuses on solving the ingestion and normalization problem rather than building a generic CRUD application.

The system currently supports:

* SAP fuel/procurement exports
* Utility electricity datasets
* Corporate travel datasets

---

# Core Features

* Multi-source CSV ingestion
* Dataset-aware parsing
* Scope 1 / 2 / 3 categorization
* Unit normalization
* Source traceability
* Audit logging
* React analyst dashboard
* Upload → Preview → Parse workflow
* Dynamic ESG results visualization

---

# Architecture Overview

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
Create ESG Records
↓
Audit Logging
↓
Results Dashboard

---

# Supported Data Sources

## 1. SAP Fuel / Procurement Data

Example fields:

* Brennstoff
* Menge
* Einheit
* Werk

Mapped to:

* Scope 1 emissions

---

## 2. Utility Electricity Data

Example fields:

* Usage_Value
* Usage_Unit
* Facility

Mapped to:

* Scope 2 emissions

---

## 3. Corporate Travel Data

Example fields:

* Travel_Type
* Distance_km
* Employee_ID

Mapped to:

* Scope 3 emissions

---

# Dataset-Aware Parsing

The platform dynamically detects uploaded dataset type using schema inspection.

Example:

```python
if 'Usage_Value' in df.columns:
    utility_parser()

elif 'Brennstoff' in df.columns:
    sap_parser()

elif 'Travel_Type' in df.columns:
    travel_parser()
```

This reflects realistic enterprise ingestion pipelines where every source system exposes different structures.

---

# Unit Normalization

The system normalizes inconsistent units during ingestion.

Supported conversions include:

| Source Unit | Target Unit |
| ----------- | ----------- |
| MWh         | kWh         |
| GAL         | Liters      |
| ton         | kg          |

---

# Tech Stack

## Backend

* Django
* Django REST Framework
* Pandas
* SQLite

---

## Frontend

* React
* Axios
* React Router
* CSS3

---

# Frontend Workflow

Choose CSV
↓
Upload File
↓
Preview Dataset
↓
Parse CSV
↓
View ESG Results Dashboard

---

# Project Structure

```bash
esg-project/

├── backend/
│   ├── api/
│   ├── manage.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── MODEL.md
├── DECISIONS.md
├── TRADEOFFS.md
├── SOURCES.md
└── README.md
```

---

# Setup Instructions

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py runserver
```

Backend runs at:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# API Endpoints

| Endpoint     | Purpose                |
| ------------ | ---------------------- |
| /api/upload/ | Upload CSV             |
| /api/parse/  | Parse uploaded dataset |

---

# Design Philosophy

The project intentionally prioritizes:

* ingestion realism
* explainability
* schema-aware parsing
* auditability

over:

* feature quantity
* infrastructure complexity
* premature optimization

The goal was to simulate how real ESG ingestion systems evolve when integrating heterogeneous enterprise data sources.

---

# Current Limitations

The prototype intentionally excludes:

* authentication
* OCR/PDF parsing
* async ingestion queues
* emissions factor calculations
* approval locking workflows

These were intentionally excluded to focus on ingestion architecture and normalization correctness.

---

# Future Improvements

Potential future enhancements include:

* role-based access control
* emissions factor engine
* PDF utility parsing
* async ingestion jobs
* analyst approval workflows
* tenant-specific schemas
* AI-assisted anomaly detection

---

# Conclusion

This platform was designed as a realistic ESG ingestion prototype focused on:

* heterogeneous enterprise data handling
* normalization pipelines
* ESG scope categorization
* analyst visibility
* explainable transformations

The architecture intentionally emphasizes ingestion quality and schema flexibility over generic CRUD development.
