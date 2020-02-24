import React from "react";

const JobTableRow = () => {
  return (
    <tr className="">
      <th scope="row">Default</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  );
};

const RecruiterTableRow = () => {
  return (
    <tr className="">
      <th scope="row">Default</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  );
};

const TableRows = ({ recruiter }) => {
  return <>{recruiter ? <RecruiterTableRow /> : <JobTableRow />}</>;
};

export default TableRows;
