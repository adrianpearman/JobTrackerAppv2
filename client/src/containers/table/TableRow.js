import React from "react";
import capitalize from "../../utils/capitalizeContent";
import displayMonth from "../../utils/displayMonth";

const JobTableRow = ({ content }) => {
  const {
    applicationYear,
    response,
    interview,
    hired,
    applicationLink,
    applicationMonth,
    applicationPlatform,
    companyName
  } = content;

  return (
    <tr className="">
      <td>{capitalize(companyName)}</td>
      <td>{displayMonth(applicationMonth)}</td>
      <td>{applicationYear}</td>
      <td>
        <a href="" target="_blank">
          {applicationLink.substring(0, 30)}
        </a>
      </td>
      <td>{capitalize(applicationPlatform)}</td>
      <td>{response ? "Yes" : "No"}</td>
      <td>{interview ? "Yes" : "No"}</td>
      <td>{hired ? "Yes" : "No"}</td>
    </tr>
  );
};

const RecruiterTableRow = ({ content }) => {
  return (
    <tr className="">
      <td>Default</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  );
};

const TableRows = ({ recruiter, content }) => {
  return (
    <>
      {recruiter ? (
        <RecruiterTableRow content={content} />
      ) : (
        <JobTableRow content={content} />
      )}
    </>
  );
};

export default TableRows;
