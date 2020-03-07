import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const TableContainer = ({ recruiter, data }) => {
  return (
    <table className="table table-hover mt-2">
      <TableHead recruiter={recruiter} />
      <tbody>
        {data.length > 0
          ? data.map((content, index) => {
              return (
                <TableRow content={content} key={index} recruiter={recruiter} />
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default TableContainer;
