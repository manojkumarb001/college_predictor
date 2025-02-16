import React from "react";

const CollegeTable = ({ colleges }) => {
  console.log("Rendering Table with data:", colleges);
  return (
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
            <td>{college.name || college.college_name}</td>
            <td>{college.branch || college.department}</td>
            <td>{college.cutoff}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollegeTable;
