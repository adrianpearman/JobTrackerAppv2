import React from "react";

const UpdateJobTableHead = () => {
  return (
    <tr className="table-primary">
      <th scope="col">Company Name</th>
      <th scope="col">Month</th>
      <th scope="col">Year</th>
      <th scope="col">Application Link</th>
      <th scope="col">Platform</th>
      <th scope="col">Response</th>
      <th scope="col">Interview</th>
      <th scope="col">Hired</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  );
};
const UpdateRecruiterTableHead = () => {
  return (
    <tr className="table-primary">
      <th scope="col">Recruiter Name</th>
      <th scope="col">Recruiter Company</th>
      <th scope="col">Date</th>
      <th scope="col">Month</th>
      <th scope="col">Year</th>
      <th scope="col">Recruiter Role</th>
      <th scope="col">Lead To Role</th>
      <th scope="col">Lead To Interview</th>
      <th scope="col">Hiring Internally</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  );
};

const UpdateTableHead = ({ recruiter }) => {
  return (
    <thead>
      {recruiter ? <UpdateRecruiterTableHead /> : <UpdateJobTableHead />}
    </thead>
  );
};

export default UpdateTableHead;
