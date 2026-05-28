# TRADEOFFS.md

The goal was to prioritize:

* ingestion correctness
* explainability
* schema-aware parsing
* maintainable architecture

within the available implementation time.

---

# 1. No Authentication or Role-Based Access Control

## Not Implemented

The platform does not currently include:

* login/signup
* JWT authentication
* RBAC permissions
* analyst vs auditor roles

---

## Why

Authentication would have added substantial implementation overhead while contributing little to the core ingestion and normalization problem.

The assignment primarily focused on:

* ESG ingestion architecture
* normalization workflows
* data traceability
* review visibility

The backend models were intentionally structured so authentication and tenant-level permissions could be layered later without major refactoring.

---

## Tradeoff

### Gain

* Faster iteration on ingestion workflows
* Simpler debugging
* More focus on parser correctness

### Loss

* No real tenant security
* No analyst-specific workflows
* No protected APIs

---

# 2. No PDF Parsing or OCR-Based Utility Extraction

## Not Implemented

Utility ingestion currently supports only CSV uploads.

The platform does not support:

* PDF utility bills
* OCR extraction
* scanned invoices
* image-based parsing

---

## Why

PDF extraction introduces a completely different problem domain involving:

* OCR reliability
* layout detection
* vendor-specific templates
* parsing ambiguity

Implementing reliable utility PDF extraction would have consumed most of the assignment timeline and reduced focus on the ESG ingestion architecture itself.

CSV ingestion was chosen because utility portals commonly expose CSV exports in enterprise workflows.

---

## Tradeoff

### Gain

* Stable ingestion pipeline
* Simpler schema debugging
* More deterministic parsing

### Loss

* No support for unstructured utility documents
* Reduced real-world ingestion coverage

---

# 3. No Background Job Queue or Async Processing

## Not Implemented

All parsing currently occurs synchronously during request execution.

The system does not include:

* Celery workers
* Redis queues
* async ingestion pipelines
* scheduled jobs

---

## Why

The uploaded datasets in the prototype are relatively small and manageable within synchronous request execution.

Adding distributed job infrastructure would have:

* increased deployment complexity
* introduced infrastructure overhead
* shifted focus away from ingestion design

The current synchronous pipeline made the ingestion lifecycle easier to understand and debug during development.

---

## Tradeoff

### Gain

* Simpler architecture
* Easier debugging
* Faster local iteration

### Loss

* Limited scalability for very large datasets
* No distributed ingestion support
* No retry orchestration

---

# Additional Simplifications

The following were also intentionally simplified:

| Feature           | Simplification             |
| ----------------- | -------------------------- |
| Emission Factors  | Not calculated             |
| Approval Workflow | No record locking          |
| Validation Engine | Minimal validation         |
| Tenant Isolation  | Logical only               |
| API Integrations  | Simulated via CSV          |
| Unit Mapping      | Hardcoded conversions      |
| Schema Registry   | Conditional detection only |

---


