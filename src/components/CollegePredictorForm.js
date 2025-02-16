import React, { useState } from "react";
import TableComponent from "./TableComponent";
import { fetchPredictedColleges } from "../api";

const CollegePredictorForm = () => {
  const [score, setScore] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [predictedColleges, setPredictedColleges] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchPredictedColleges({ score, category, location });
    console.log("Received Data:", data); // Debugging
    setPredictedColleges(data);
    console.log("predictedColleges :", predictedColleges); // Debugging

  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Cutoff Score:</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select</option>
          <option value="BC">BC</option>
          <option value="MBC">MBC</option>
          <option value="SC">SC</option>
        </select>

        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Predict Colleges</button>
      </form>

      {predictedColleges.length === 0 ? (
        <p className="no-data">No colleges found. Try a different input.</p>
      ) : (
        <TableComponent colleges={predictedColleges} />
      )}
    </div>
  );
};

export default CollegePredictorForm;
