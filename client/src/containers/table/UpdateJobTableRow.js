import React from "react";

const UpdateJobTableRow = ({ toggleModal, content }) => {
  const {
    userId,
    applicationId,
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
      <td>{companyName}</td>
      <td>{applicationMonth}</td>
      <td>{applicationYear}</td>
      <td>{applicationLink}</td>
      <td>{applicationPlatform}</td>
      <td>{response ? "Yes" : "No"}</td>
      <td>{interview ? "Yes" : "No"}</td>
      <td>{hired ? "Yes" : "No"}</td>
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

export default UpdateJobTableRow;
