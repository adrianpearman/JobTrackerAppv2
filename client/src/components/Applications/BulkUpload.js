import React from "react";

import { connect } from "react-redux";
import {
  handleFileSelect,
  handleSubmitFile,
  clearSubmitFile
} from "../../redux/actions";

const renderDisplayButtons = props => {
  if (props.bulkUpload.csvData !== null) {
    return (
      <div className="col-6 offset-3 mt-2" style={{ textAlign: "center" }}>
        <button className="btn btn-danger" onClick={props.clearSubmitFile}>
          Clear File
        </button>
        <button className="btn btn-primary" onClick={props.handleSubmitFile}>
          Submit File
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

const renderSuccessfulMessage = props => {
  switch (props.bulkUpload.uploadSuccessful) {
    case true:
      return (
        <div className="alert alert-success mt-2">
          <strong>CSV Successfully Submitted</strong>
        </div>
      );
    case false:
      return (
        <div className="alert alert-danger mt-2">
          <strong>Error Occured: Please Try Again</strong>
        </div>
      );
    default:
      return <></>;
  }
};

const BulkUpload = props => {
  return (
    <div className="col-12">
      {props.bulkUpload.isCSV === false ? <div>NOT A CSV FILE!</div> : <></>}
      <div className="col-6 offset-3 mt-5" style={{ textAlign: "center" }}>
        <label className="btn btn-primary align-middle" htmlFor="files">
          Choose a file
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="files"
          onChange={props.handleFileSelect}
          accept=".csv"
        />
      </div>
      {renderSuccessfulMessage(props)}
      {renderDisplayButtons(props)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    bulkUpload: state.bulkUploadReducer
  };
};

const mapDispatchToProps = {
  handleSubmitFile,
  handleFileSelect,
  clearSubmitFile
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkUpload);
