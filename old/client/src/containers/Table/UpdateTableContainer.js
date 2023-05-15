import React from "react";
import { connect } from "react-redux";
import UpdateTableHead from "./UpdateTableHead";
import UpdateTableRow from "./UpdateTableRow";
import Modal from "../Modal/Modal";
import actions from "../../redux/actions";

const TableContainer = ({ recruiter, data, toggleModal }) => {
  return (
    <>
      <Modal />
      <table className="table table-hover mt-2">
        <UpdateTableHead recruiter={recruiter} />
        <tbody>
          {data.map((content, index) => {
            return (
              <UpdateTableRow
                content={content}
                recruiter={recruiter}
                key={index}
                toggleModal={toggleModal}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = ({ modal }) => {
  return {
    modal
  };
};

const mapDispatchToProps = {
  toggleModal: actions.showToggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
