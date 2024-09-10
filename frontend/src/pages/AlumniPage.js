// pages/AlumniPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function AlumniPage() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Fetch universities ordered by alumni employment for the year 2012
    axios
      .get("http://localhost:5000/api/alumni")
      .then((response) => {
        // Set the fetched data in state
        setUniversities(response.data);
      })
      .catch((error) => {
        // Log the error message in case of an error
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Universities Ordered by Alumni Employment (2012)</h2>
      {/* Render a table of universities */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Institution</th>
            <th>Alumni Employment</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the list of universities and render each one */}
          {universities.map((university, index) => (
            <tr key={index}>
              <td>{university.institution}</td>
              <td>{university.alumni_employment}</td>
              <td>{university.country}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AlumniPage;