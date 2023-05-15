import React from "react";
//Redux
import { connect } from "react-redux";
import actions from "../../../redux/actions";
// Components
import RenderSuccessfulMessage from "../../../containers/RenderSuccessMessage";
import RenderDisplayButtons from "../../../containers/RenderDisplayButtons";

const BulkJobUpload = ({
  bulkUpload,
  clearSubmitFile,
  handleFileSelect,
  handleSubmitFile
}) => {
  return (
    <div className="col-12">
      {bulkUpload.isCSV === false ? <div>NOT A CSV FILE!</div> : <></>}
      <div className="col-6 offset-3 mt-5" style={{ textAlign: "center" }}>
        <label
          className="btn btn-primary align-middle"
          htmlFor="csvDataApplication"
        >
          Choose a file
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="csvDataApplication"
          onChange={handleFileSelect}
          accept=".csv"
        />
      </div>
      <RenderSuccessfulMessage uploadSuccessful={bulkUpload.uploadSuccessful} />
      <RenderDisplayButtons
        submitId="csvDataApplication"
        bulkUpload={bulkUpload}
        clearSubmitFile={clearSubmitFile}
        handleSubmitFile={handleSubmitFile}
      />
    </div>
  );
};

const mapStateToProps = ({ bulkUploadReducer }) => {
  return {
    bulkUpload: bulkUploadReducer
  };
};

const mapDispatchToProps = {
  handleSubmitFile: actions.handleSubmitFile,
  handleFileSelect: actions.handleFileSelect,
  clearSubmitFile: actions.clearSubmitFile
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkJobUpload);
