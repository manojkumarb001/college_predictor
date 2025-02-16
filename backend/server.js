const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "manoj",
  database: "collegePredictor",
});

db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// API Route to handle predictions
app.post("/predict", async (req, res) => {
  const { score, category, location } = req.body;

  try {
    // Send data to ML model
    const mlResponse = await axios.post("http://127.0.0.1:5000/predict", req.body);

    // Fetch colleges from database based on ML model output
    const sqlQuery = "SELECT * FROM colleges WHERE cutoff <= ? AND category = ? AND location = ?";
    db.query(sqlQuery, [score, category, location], (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ predictions: mlResponse.data, colleges: results });
      }
    });

  } catch (error) {
    console.error("ML Model Error:", error.message);
    res.status(500).json({ error: "ML Model Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
