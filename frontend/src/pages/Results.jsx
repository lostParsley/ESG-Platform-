import { useLocation } from "react-router-dom";

import "../App.css";

function Results() {

  const location = useLocation();

  const records =
    location.state?.records || [];

  // TOTALS

  const totalRecords =
    records.length;

  const scope1 =
    records.filter(
      (r) => r.scope === "Scope 1"
    ).length;

  const scope2 =
    records.filter(
      (r) => r.scope === "Scope 2"
    ).length;

  const scope3 =
    records.filter(
      (r) => r.scope === "Scope 3"
    ).length;

  return (

    <div className="results-page">

      {/* HEADER */}

      <div className="results-header">

        <h1 className="results-title">
          ESG Processing Results
        </h1>

        <p className="results-subtitle">
          Final normalized ESG output
        </p>

      </div>

      {/* STATS */}

      <div className="stats-container">

        <div className="stat-card">

          <h2>Total Records</h2>

          <h1>{totalRecords}</h1>

        </div>

        <div className="stat-card scope1-card">

          <h2>Scope 1</h2>

          <h1>{scope1}</h1>

        </div>

        <div className="stat-card scope2-card">

          <h2>Scope 2</h2>

          <h1>{scope2}</h1>

        </div>

        <div className="stat-card scope3-card">

          <h2>Scope 3</h2>

          <h1>{scope3}</h1>

        </div>

      </div>

      {/* TABLE */}

      <div className="results-table-container">

        <table className="results-table">

          <thead>

            <tr>

              <th>Category</th>

              <th>Value</th>

              <th>Unit</th>

              <th>
                Normalized Value
              </th>

              <th>
                Normalized Unit
              </th>

              <th>Scope</th>

            </tr>

          </thead>

          <tbody>

            {records.map((r) => (

              <tr key={r.id}>

                <td>{r.category}</td>

                <td>{r.value}</td>

                <td>{r.unit}</td>

                <td>
                  {r.normalized_value}
                </td>

                <td>
                  {r.normalized_unit}
                </td>

                <td>

                  <span
                    className={`scope-badge ${r.scope.replace(
                      " ",
                      ""
                    ).toLowerCase()}`}
                  >

                    {r.scope}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Results;