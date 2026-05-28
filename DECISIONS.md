# ESG Data Platform — DECISIONS.md


---

# 1. Why CSV Upload Was Chosen

## Decision

All three sources were implemented using CSV ingestion instead of direct APIs or PDF extraction.

---

## Why

CSV ingestion provided the most realistic prototype path within the assignment timeline because:

* SAP exports are commonly delivered as flat-file CSV exports
* Utility portals frequently support CSV downloads
* Corporate travel platforms export tabular travel reports

CSV ingestion also allowed:

* easier schema experimentation
* realistic parser complexity
* easier frontend upload workflows
* clearer debugging visibility

---

## Alternatives Considered

| Alternative                 | Why Not Chosen                |
| --------------------------- | ----------------------------- |
| Direct SAP APIs             | Too large for prototype scope |
| PDF utility parsing         | High OCR complexity           |
| Live Concur API integration | Authentication overhead       |
| Scheduled ingestion jobs    | Unnecessary for prototype     |

---

# 2. Why Dataset-Aware Parsing Was Implemented

## Decision

Instead of building one universal parser, the system detects dataset type dynamically and routes records through specialized parsers.

---

## Why

The uploaded datasets had completely different schemas.

Examples:

| Dataset | Example Columns          |
| ------- | ------------------------ |
| Utility | Usage_Value, Usage_Unit  |
| SAP     | Brennstoff, Menge        |
| Travel  | Travel_Type, Distance_km |

A single generic parser would have:

* produced incorrect mappings
* hidden ingestion assumptions
* reduced explainability

The conditional parser architecture better reflects how real enterprise ingestion systems operate.

---

## Final Parsing Strategy

```python id="jlwm0m"
if 'Usage_Value' in df.columns:
    utility_parser()

elif 'Brennstoff' in df.columns:
    sap_parser()

elif 'Travel_Type' in df.columns:
    travel_parser()
```

---

# 3. Why Preview-Then-Parse Workflow Was Chosen

## Decision

The ingestion workflow was intentionally separated into two stages:

Upload CSV
↓
Preview Generated
↓
Parse CSV

instead of directly ingesting data after upload.

---

## Why

Enterprise ESG workflows often require analysts to inspect incoming data before normalization or persistence.

This staged architecture provides:

* ingestion transparency
* debugging visibility
* schema validation opportunities
* analyst review capability

This also mirrors realistic ETL systems.

---

# 4. Why Raw Uploaded Files Are Stored

## Decision

Uploaded files are stored before parsing instead of parsing directly from request memory.

---

## Why

This supports:

* source traceability
* parser reproducibility
* auditability
* future reprocessing

This also solved issues related to file stream exhaustion during repeated pandas reads.

---

# 5. Scope Categorization Strategy

## Decision

Scope classification is inferred from dataset type.

---

## Final Mapping

| Dataset             | Scope   |
| ------------------- | ------- |
| SAP fuel data       | Scope 1 |
| Utility electricity | Scope 2 |
| Travel data         | Scope 3 |

---

## Why

The assignment focused on ingestion realism rather than exact emissions calculation methodology.

Dataset-level categorization provided:

* deterministic behavior
* explainable logic
* simplified prototype architecture

---

# 6. Why Unit Normalization Was Added During Parsing

## Decision

Unit normalization occurs during ingestion instead of downstream reporting.

---

## Why

Different source systems expose inconsistent units.

Examples:

* MWh vs kWh
* Gallons vs Liters
* Tons vs Kilograms

Normalizing during parsing ensures:

* downstream consistency
* simplified analytics
* easier dashboarding

---

## Current Supported Normalizations

| Source Unit | Target Unit |
| ----------- | ----------- |
| MWh         | kWh         |
| GAL         | Liters      |
| ton         | kg          |

---

# 7. Why Django REST Framework Was Chosen

## Decision

Backend implemented using Django REST Framework.

---

## Why

DRF provided:

* rapid API development
* serialization support
* structured response handling
* scalable architecture for future expansion

This was particularly useful for:

* file upload handling
* ingestion endpoints
* normalized API responses

---

# 8. Why React Was Chosen For Frontend

## Decision

Frontend implemented using React with React Router.

---

## Why

React enabled:

* state-driven upload workflow
* dynamic preview rendering
* staged parsing UI
* reusable dashboard components

The frontend architecture focused on analyst usability rather than marketing-oriented UI.

---

# 9. Why Audit Logging Was Simplified

## Decision

Audit logging currently tracks:

* CSV parsing operations
* ESG record creation

instead of field-level diff tracking.

---

## Why

The prototype focused primarily on ingestion architecture.

Full audit systems require:

* user authentication
* version snapshots
* field-level change history
* immutable revision chains

These were considered out-of-scope for the assignment timeline.

---

# 10. Why Authentication Was Not Implemented

## Decision

Authentication and authorization were intentionally excluded.

---

## Why

The assignment emphasized:

* ingestion architecture
* data modeling
* normalization
* review workflows

Implementing authentication would have consumed significant time without improving ingestion realism.

The current architecture was intentionally designed so authentication could be layered later without major refactoring.

---

# 11. What Would Be Clarified With A PM

If this were a production engagement, the following questions would be clarified:

---

## SAP Questions

* Which SAP export format is actually used?
* Are plant code lookup tables available?
* Are multilingual exports expected?

---

## Utility Questions

* Are utility bills always CSV?
* Are billing periods guaranteed?
* Are tariff structures needed downstream?

---

## Travel Questions

* Is distance always available?
* Should airport-code distance estimation be supported?
* Are hotels part of Scope 3 calculations?

---

## Review Workflow Questions

* What approval states are required?
* Should approvals lock records?
* Are edits allowed post-approval?

---


