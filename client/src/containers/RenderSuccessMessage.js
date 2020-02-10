import React from "react";

const renderSuccessfulMessage = props => {
  console.log(props);
  switch (props.uploadSuccessful) {
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

export default renderSuccessfulMessage;
