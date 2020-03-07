import React from "react";
import { connect } from "react-redux";
import UpdateTableHead from "./UpdateTableHead";
import UpdateJobTableRow from "./UpdateJobTableRow";
import UpdateRecruiterTableRow from "./UpdateRecruiterTableRow";
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
            if (recruiter) {
              return (
                <UpdateRecruiterTableRow
                  key={index}
                  content={content}
                  toggleModal={toggleModal}
                />
              );
            } else {
              return (
                <UpdateJobTableRow
                  key={index}
                  content={content}
                  toggleModal={toggleModal}
                />
              );
            }
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
