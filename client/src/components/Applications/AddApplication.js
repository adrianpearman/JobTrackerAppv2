import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { onInputHandler } from "../../redux/actions/index";
// Components
import SingleUploads from "./SingleUpload";
import BulkUpload from "./BulkUpload";
import Tabs from "../../containers/Tab";

class AddApplication extends Component {
  render() {
    return (
      <div className="col-12">
        <Tabs>
          <div title="Single Upload">
            <h2 className="text-center">Add an Application</h2>
            <SingleUploads />
          </div>
          <div title="Bulk Upload">
            <h2 className="text-center">Bulk Upload Applications</h2>
            <BulkUpload />
          </div>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    jobs: state.jobs
  };
};

export default connect(mapStateToProps, { onInputHandler })(AddApplication);
