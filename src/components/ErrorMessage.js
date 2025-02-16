import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;
