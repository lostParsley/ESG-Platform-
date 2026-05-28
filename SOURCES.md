# SOURCES.md


---

# 1. SAP Fuel / Procurement Dataset

## Researched Formats

The research focused on:

* SAP IDoc exports
* flat-file SAP exports
* CSV-based procurement exports

Key references:

* SAP IDoc flat file workflows
* SAP export and integration documentation
* SAP procurement integration examples

Research showed that SAP enterprise integrations commonly expose:

* IDoc structures
* flat files
* CSV exports
* OData integrations

rather than clean application-level APIs.

---

## What Was Learned

SAP exports are highly inconsistent across enterprises.

Common issues observed:

* multilingual column names
* plant-specific fields
* inconsistent units
* flat-file oriented exports
* ERP-centric field naming

The prototype intentionally simulated:

* German column names
* inconsistent fuel units
* operational plant metadata

Examples included:

* Brennstoff
* Menge
* Einheit
* Werk

These patterns were inspired by realistic SAP export conventions.

---

## Sample Dataset Design

The fabricated SAP dataset includes:

* fuel consumption quantities
* plant identifiers
* mixed units
* operational metadata

Example fields:

| Column     | Meaning    |
| ---------- | ---------- |
| Brennstoff | Fuel type  |
| Menge      | Quantity   |
| Einheit    | Unit       |
| Werk       | Plant code |

The parser maps this dataset to:

* Scope 1 emissions

because operational fuel combustion typically falls under Scope 1 reporting.

---

## Real Deployment Limitations

A production SAP integration would require:

* configurable field mapping
* ERP-specific connectors
* plant lookup tables
* multilingual schema support
* validation against ERP master data

The prototype intentionally simplified these requirements.

---

# 2. Utility Electricity Dataset

## Researched Formats

Research focused on:

* utility portal CSV exports
* Green Button energy exports
* electricity billing spreadsheet formats

Research showed that utilities commonly expose:

* downloadable CSV reports
* billing-period exports
* spreadsheet-based consumption summaries

rather than developer-friendly APIs.

---

## What Was Learned

Utility datasets commonly contain:

* meter readings
* billing periods
* tariff structures
* facility identifiers
* inconsistent energy units

Common unit inconsistencies:

* kWh
* MWh
* hourly intervals

The prototype intentionally simulated:

* mixed energy units
* facility-based records
* billing-oriented schemas

---

## Sample Dataset Design

The fabricated utility dataset includes:

| Column        | Meaning            |
| ------------- | ------------------ |
| Facility      | Site identifier    |
| Usage_Value   | Energy usage       |
| Usage_Unit    | Energy unit        |
| Billing_Start | Billing start date |
| Billing_End   | Billing end date   |

The parser maps this dataset to:

* Scope 2 emissions

because purchased electricity is categorized under Scope 2.

---

## Real Deployment Limitations

A production utility ingestion system would require:

* utility-specific adapters
* billing validation
* meter reconciliation
* PDF bill extraction
* OCR support
* time-series aggregation

The prototype intentionally focuses only on structured CSV ingestion.

---

# 3. Corporate Travel Dataset

## Researched Formats

Research focused on:

* SAP Concur exports
* travel expense exports
* CSV/Excel travel reporting workflows

Research showed that travel systems commonly expose:

* expense exports
* spreadsheet reports
* API-accessible expense data
* employee travel records

rather than emissions-specific datasets.

---

## What Was Learned

Travel datasets often contain:

* employee IDs
* travel categories
* airports
* expense metadata
* hotel bookings
* incomplete distance information

Different travel categories imply different ESG implications.

Examples:

* flights
* taxis
* hotels
* rail

The prototype simplified this by focusing primarily on:

* travel category
* distance
* employee activity

---

## Sample Dataset Design

The fabricated travel dataset includes:

| Column      | Meaning             |
| ----------- | ------------------- |
| Employee_ID | Traveler identifier |
| Travel_Type | Travel category     |
| Origin      | Departure location  |
| Destination | Arrival location    |
| Distance_km | Travel distance     |

The parser maps this dataset to:

* Scope 3 emissions

because business travel is typically categorized under Scope 3.

---

## Real Deployment Limitations

A production travel ingestion system would likely require:

* airport-code distance estimation
* itinerary stitching
* emissions factor calculation
* duplicate expense detection
* API authentication
* travel policy reconciliation

These were intentionally excluded from the prototype scope.

---

# Overall Research Observations

Across all three sources, the primary insight was that enterprise ESG ingestion is fundamentally a schema heterogeneity problem.

The difficult part is not storing ESG records.

The difficult part is:

* inconsistent source structures
* missing fields
* inconsistent units
* operational ambiguity
* source-specific semantics


