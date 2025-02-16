import React from "react";

const PredictionResult = ({ prediction }) => {
  return (
    <div className="result-container">
      <h2>Predicted Colleges</h2>
      <pre>{JSON.stringify(prediction, null, 2)}</pre>
    </div>
  );
};

export default PredictionResult;
