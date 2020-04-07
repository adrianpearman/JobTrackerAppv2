import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import displayMonth from "../../../utils/displayMonth";
import capitalize from "../../../utils/capitalizeContent";

const UpdateApplicationTableRow = ({
  toggleModal,
  content,
  deleteApplication
}) => {
  const {
    userId,
    _id: applicationId,
    companyName,
    applicationLink,
    applicationPlatform,
    applicationMonth,
    applicationYear,
    response,
    interview,
    hired
  } = content;

  return (
    <tr className="" id={applicationId}>
      <td>{capitalize(companyName)}</td>
      <td>{displayMonth(applicationMonth)}</td>
      <td>{applicationYear}</td>
      <td>{applicationLink.substring(0, 30)}</td>
      <td>{capitalize(applicationPlatform)}</td>
      <td>{response ? "Yes" : "No"}</td>
      <td>{interview ? "Yes" : "No"}</td>
      <td>{hired ? "Yes" : "No"}</td>
      <td>
        <button onClick={() => toggleModal(true)} className="btn btn-primary">
          Update
        </button>
      </td>
      <td>
        <button
          onClick={() => deleteApplication(userId, applicationId)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  deleteApplication: actions.deleteApplication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateApplicationTableRow);
