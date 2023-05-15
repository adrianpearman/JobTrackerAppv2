import React from "react";

// Components
import SingleUploads from "./SingleJobUpload";
import BulkUpload from "./BulkJobUpload";
import Tabs from "../../../containers/Tab";

const AddApplication = () => {
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
};

export default AddApplication;
