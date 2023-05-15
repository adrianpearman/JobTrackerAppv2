// NPM Modules
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
// Context PRovider
import { ContextProvider } from "../Context/ContextProvider";

const ApplicationList = ({
  applications,
  handleDeleteApplication,
  handleEditApplication,
}) => {
  // Context Provider
  const context = useContext(ContextProvider);

  return (
    <ul>
      {applications.map((app) => {
        const {
          applicationDate,
          companyName,
          decision,
          interview,
          link,
          platform,
          response,
          responseDate,
          sourceSite,
          _id,
        } = app;

        return (
          <li key={uuidv4()}>
            <p>
              <span>Company Name</span>
              {companyName}
            </p>
            <p>
              <span>Source Site</span>
              {sourceSite}
            </p>
            <p>
              <span>Application Link</span>
              {link}
            </p>
            <p>
              <span>Application Date</span>
              {applicationDate}
            </p>

            <p>
              <span>Response</span>
              {response}
            </p>
            <p>
              <span>Decision</span>
              {decision}
            </p>
            <p>
              <span>Response Date</span>
              {responseDate}
            </p>
            <p>
              <span></span>
              {interview}
            </p>
            <p>
              <span>Application Platform</span>
              {platform}
            </p>
            <button
              onClick={() => {
                handleEditApplication(_id);
              }}
            >
              Edit Application
            </button>
            <button
              onClick={() => {
                handleDeleteApplication(_id, context.user.uid);
              }}
            >
              Delete Application
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ApplicationList;
