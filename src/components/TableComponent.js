import React from "react";

const TableComponent = ({ colleges }) => {
    console.log("Table :", colleges); // Debugging

  return (
    <div className="table-container">
      <h2>Predicted Colleges</h2>
      <table>
        <thead>
          <tr>
            <th>College Name</th>
            <th>Branch</th>
            <th>Cutoff</th>
          </tr>
        </thead>
        <tbody>
  {colleges.map((college, index) => (
    <tr key={index}>
      <td>{college.College || college.college_name}</td>
      <td>{college.Course || college.department}</td>
      <td>{college.Cutoff}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default TableComponent;
