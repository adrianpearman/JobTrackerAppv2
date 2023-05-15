import React from "react";
// Components
import Tabs from "../../../containers/Tab";
import SingleRecruiter from "./SingleRecruiterUpload";
import BulkRecruiter from "./BulkRecruiterUpload";

const AddApplication = () => {
  return (
    <div className="col-12">
      <Tabs>
        <div title="Single Upload">
          <h2 className="text-center">Add a Recruiter Message</h2>
          <SingleRecruiter />
        </div>
        <div title="Bulk Upload">
          <h2 className="text-center">Bulk Upload Recruiter Messages</h2>
          <BulkRecruiter />
        </div>
      </Tabs>
    </div>
  );
};

export default AddApplication;
