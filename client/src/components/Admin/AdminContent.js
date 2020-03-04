import React from "react";
import Tabs from "../../containers/Tab";
import AdminApplications from "./AdminApplications";
import AdminRecruiters from "./AdminRecruiters";

function AdminContent() {
  return (
    <div className="col-12">
      <Tabs>
        <div title="Applications">
          <AdminApplications recruiter={false} />
        </div>
        <div title="Recruiters">
          <AdminRecruiters recruiter={true} />
        </div>
      </Tabs>
    </div>
  );
}
export default AdminContent;
