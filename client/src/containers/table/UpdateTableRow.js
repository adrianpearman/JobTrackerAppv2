import React from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";

const UpdateJobTableRow = ({ toggleModal }) => {
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
      <td>
        <button onClick={() => toggleModal(true)} className="btn btn-primary">
          Update
        </button>
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
};

const UpdateRecruiterTableRow = () => {
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
      <td>
        <button className="btn btn-primary">Update</button>
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
};

const UpdateTableRows = ({ recruiter, toggleModal }) => {
  return (
    <>
      {recruiter ? (
        <UpdateRecruiterTableRow />
      ) : (
        <UpdateJobTableRow toggleModal={toggleModal} />
      )}
    </>
  );
};

const mapStateToProps = ({ modal }) => {
  return {
    modal: modal
  };
};

const mapDispatchToProps = {
  toggleModal: actions.showToggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTableRows);
