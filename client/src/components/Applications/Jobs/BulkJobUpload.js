import React from "react";
//Redux
import { connect } from "react-redux";
import {
  handleFileSelect,
  handleSubmitFile,
  clearSubmitFile
} from "../../../redux/actions";
// Components
import RenderSuccessfulMessage from "../../../containers/RenderSuccessMessage";
import RenderDisplayButtons from "../../../containers/RenderDisplayButtons";

const BulkJobUpload = props => {
  return (
    <div className="col-12">
      {props.bulkUpload.isCSV === false ? <div>NOT A CSV FILE!</div> : <></>}
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
          onChange={props.handleFileSelect}
          accept=".csv"
        />
      </div>
      <RenderSuccessfulMessage
        uploadSuccessful={props.bulkUpload.uploadSuccessful}
      />
      <RenderDisplayButtons
        submitId="csvDataApplication"
        bulkUpload={props.bulkUpload}
        clearSubmitFile={props.clearSubmitFile}
        handleSubmitFile={props.handleSubmitFile}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(BulkJobUpload);
