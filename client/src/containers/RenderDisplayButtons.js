import React from "react";

const renderDisplayButtons = ({
  bulkUpload,
  clearSubmitFile,
  handleSubmitFile,
  submitId
}) => {
  console.log(bulkUpload[submitId]);
  if (bulkUpload[submitId] !== null) {
    return (
      <div className="col-6 offset-3 mt-2" style={{ textAlign: "center" }}>
        <button
          className="btn btn-danger"
          onClick={() => clearSubmitFile(submitId)}
        >
          Clear File
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleSubmitFile(submitId)}
        >
          Submit File
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default renderDisplayButtons;
