export const fetchPredictedColleges = async (inputData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      return Array.isArray(data) ? data : []; // Ensure it's an array
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  