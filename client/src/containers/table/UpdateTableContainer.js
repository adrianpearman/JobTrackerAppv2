import React from "react";
import UpdateTableHead from "./UpdateTableHead";
import UpdateTableRow from "./UpdateTableRow";
import Modal from "../../containers/Modal";

const TableContainer = ({ recruiter }) => {
  return (
    <>
      <Modal />
      <table className="table table-hover mt-2">
        <UpdateTableHead recruiter={recruiter} />
        <tbody>
          <UpdateTableRow recruiter={recruiter} />
          <UpdateTableRow recruiter={recruiter} />
          <UpdateTableRow recruiter={recruiter} />
          <UpdateTableRow recruiter={recruiter} />
          <UpdateTableRow recruiter={recruiter} />
        </tbody>
      </table>
    </>
  );
};

export default TableContainer;
