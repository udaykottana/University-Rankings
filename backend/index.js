let mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

let con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "dbmsProject",
});

con.connect((err) => {
  if (err) return console.error(err.message);
  con.query("SELECT * FROM universities", (err, rows) => {
    if (err) throw err;
    console.log("data received from db:");
  });
  console.log("Connected to the MySQL server.");
});

const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/country", (req, res) => {
  con.query(
    'select * from universities where country = "USA" and year=2012',
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/top20", (req, res) => {
  con.query(
    "select institution from universities where world_rank <20 and year=2012",
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/qualityOfTeachers", (req, res) => {
  con.query(
    "select institution , quality_of_faculty from universities where year=2012 order by quality_of_faculty ",
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/countryAndNationalRank", (req, res) => {
  con.query(
    "select institution , national_rank from universities where country = 'USA'and year=2012 order by national_rank",
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/alumni", (req, res) => {
  con.query(
    "select institution , alumni_employment , country from universities where year=2012  order by alumni_employment",
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/citations", (req, res) => {
  con.query(
    "select institution , citations , country from universities where year=2012  order by citations",
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/qualityOfEducation", (req, res) => {
  con.query(
    "select institution , quality_of_education , country from universities where year=2012 order by  quality_of_education",
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get("/api/score", (req, res) => {
  con.query(
    "select institution , score , country from universities where year=2012  order by score desc",
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
