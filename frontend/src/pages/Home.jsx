import "../App.css";

import { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate
}
from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [file, setFile] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [previewData,
    setPreviewData] =
    useState([]);

  const [fileId,
    setFileId] =
    useState(null);

  const handleFileChange =
  (e) => {

    setFile(
      e.target.files[0]
    );
  };

  const handleUpload =
  async () => {

    if (!file) {

      alert(
        "Please select CSV file"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response =
      await axios.post(

        "http://127.0.0.1:8000/api/upload/",

        formData
      );

      setMessage(
        response.data.message
      );

      setPreviewData(
        response.data.preview
      );

      setFileId(
        response.data.file_id
      );

    } catch (error) {

      console.log(error);

      setMessage(
        "Upload failed"
      );
    }
  };

  const handleParse =
  async () => {

    try {

      const response =
      await axios.post(

        "http://127.0.0.1:8000/api/parse/",

        {
          file_id: fileId
        }
      );

      navigate(
        "/results",
        {
          state: {
            records:
            response.data.records
          }
        }
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="main-container">

      <div className="overlay">

        <nav className="navbar">

          <Link
            to="/"
            className="logo"
          >
            Parsley
          </Link>

          <ul className="nav-links">

            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/resources"
              >
                Resources
              </Link>
            </li>

            <li>
              Contact Us
            </li>

          </ul>

        </nav>

        <h1 className="title">
          ESG Dashboard
        </h1>

        <p className="subtitle">
          Upload, Analyze &
          Track ESG Reports
        </p>

        <div className="cards-container">

          <div className="card">

            <div className="icon green-icon">
              ⬆
            </div>

            <h2 className="green-heading">
              Upload CSV
            </h2>

            <label
              className=
              "custom-file-upload"
            >

              Choose CSV File

              <input
                type="file"
                accept=".csv"
                onChange=
                {handleFileChange}
                hidden
              />

            </label>

            <p className="filename">

              {file
                ? file.name
                : "No file selected"}

            </p>

            <button
              onClick=
              {handleUpload}

              className=
              "upload-btn"
            >
              Upload
            </button>

            <button
              onClick=
              {handleParse}

              className=
              "upload-btn"
            >
              Parse CSV
            </button>

            <p className="message">
              {message}
            </p>

            {previewData.length > 0 && (

              <table
                className=
                "preview-table"
              >

                <thead>

                  <tr>

                    {Object.keys(
                      previewData[0]
                    ).map((key) => (

                      <th key={key}>
                        {key}
                      </th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {previewData.map(
                    (row, index) => (

                    <tr key={index}>

                      {Object.values(
                        row
                      ).map((value, i) => (

                        <td key={i}>
                          {value}
                        </td>

                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;