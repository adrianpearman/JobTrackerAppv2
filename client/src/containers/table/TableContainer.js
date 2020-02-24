import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const TableContainer = ({ recruiter }) => {
  return (
    <table className="table table-hover mt-5">
      <TableHead recruiter={recruiter} />
      <tbody>
        <TableRow recruiter={recruiter} />
        <TableRow recruiter={recruiter} />
        <TableRow recruiter={recruiter} />
        <TableRow recruiter={recruiter} />
        <TableRow recruiter={recruiter} />
      </tbody>
    </table>
  );
};

export default TableContainer;
