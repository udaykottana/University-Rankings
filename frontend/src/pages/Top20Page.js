// pages/Top20Page.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Top20Page() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/top20")
      .then((response) => {
        console.log(response.data);
        setUniversities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Top 20 Universities in the World (2012)</h2>
      <ul>
        {universities.map((uni, index) => (
          <li key={index}>{uni.institution}</li>
        ))}
      </ul>
    </div>
  );
}

export default Top20Page;
