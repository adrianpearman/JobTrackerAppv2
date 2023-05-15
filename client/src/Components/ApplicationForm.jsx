// NPM Modules
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../helperFunctions/axiosClient";
// Context
import { ContextProvider } from "../Context/ContextProvider";
// Data
import formData from "../data/formData";

const ApplicationForm = () => {
  // Context
  const context = useContext(ContextProvider);
  // Navigate Hook
  const navigate = useNavigate();
  // State
  const [applicationLink, setApplicationLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [day, setDay] = useState(0);
  const [decision, setDecision] = useState(0);
  const [interview, setInterview] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [formError, setFormError] = useState(false);
  const [month, setMonth] = useState(0);
  const [response, setResponse] = useState(false);
  const [responseDate, setResponseDate] = useState("");
  const [sourceSite, setSourceSite] = useState("");
  const [submissionError, setSubmissionError] = useState(false);
  const [year, setYear] = useState(0);

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (
      companyName === "" ||
      sourceSite === "" ||
      applicationLink === "" ||
      day === 0 ||
      month === 0 ||
      year === 0
    ) {
      setFormError(true);
    } else {
      try {
        setFormError(false);
        setSubmissionError(false);

        const applicationObj = {
          companyName: companyName,
          day: day,
          decision: decision,
          interview: interview,
          interviewDate: interviewDate,
          link: applicationLink,
          month: month,
          response: response,
          responseDate: responseDate,
          sourceSite: sourceSite,
          userID: context.user.uid,
          year: year,
        };

        await axiosClient({
          method: "POST",
          url: "/api/application",
          data: applicationObj,
        });

        navigate("/");
      } catch (err) {
        setSubmissionError(true);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmitApplication(e);
      }}
    >
      <div>
        <h2>Company Details</h2>
        <div>
          <label>Company Name</label>
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter the company name"
            required={true}
            type="text"
            value={companyName}
          />
        </div>
        <div>
          <label>Source Site</label>
          <input
            onChange={(e) => setSourceSite(e.target.value)}
            placeholder="Enter the platform"
            required={true}
            type="text"
            value={sourceSite}
          />
        </div>
        <div>
          <label>Application Link</label>
          <input
            onChange={(e) => setApplicationLink(e.target.value)}
            placeholder="Enter the application link"
            required={true}
            type="text"
            value={applicationLink}
          />
        </div>
      </div>
      <div>
        <h2>Application Date</h2>
        <div>
          <label>Month</label>
          <select
            onChange={(e) => {
              setMonth(e.target.value);
            }}
            required={true}
            value={month}
          >
            <option disabled={true} value={0}>
              Choose a month
            </option>
            {formData.months.map(({ month, value }) => {
              return (
                <option key={uuidv4()} value={value}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Day</label>
          <select
            onChange={(e) => {
              setDay(e.target.value);
            }}
            required={true}
            value={day}
          >
            <option disabled={true} value={0}>
              Select a day
            </option>
            {formData.day.map((d) => {
              return (
                <option key={uuidv4()} value={d}>
                  {d}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Month</label>
          <select
            onChange={(e) => {
              setYear(e.target.value);
            }}
            required={true}
            value={year}
          >
            <option disabled={true} value={0}>
              Select a year
            </option>
            {formData.year.map((y) => {
              return (
                <option key={uuidv4()} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <h2>Response Details</h2>
        <div>
          <label>Responded?</label>
          <select
            onChange={(e) => {
              setResponse(e.target.value);
            }}
            value={response}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <label>Decision?</label>
          <select
            onChange={(e) => {
              setDecision(e.target.value);
            }}
            value={decision}
          >
            <option disabled={true} value={0}>
              What was their response?
            </option>
            <option value={1}>No Decision</option>
            <option value={2}>Hired</option>
            <option value={3}>Not Hired</option>
          </select>
        </div>
        <div>
          <label>Response Date</label>
          <input
            type="date"
            onChange={(e) => {
              setResponseDate(e.target.value);
            }}
            value={responseDate}
          />
        </div>

        <div>
          <label>Interview Scheduled?</label>
          <select
            onChange={(e) => {
              setInterview(e.target.value);
            }}
            value={interview}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div>
          <label>interview Date</label>
          <input
            type="date"
            onChange={(e) => {
              setInterviewDate(e.target.value);
            }}
            value={interviewDate}
          />
        </div>
      </div>
      <div>
        <button>Submit Application</button>
      </div>
      {formError ? (
        <div>
          <p>Error! Please check that all required fields are filled!</p>
        </div>
      ) : null}
      {submissionError ? (
        <div>
          <p>An error occured submitting the form! Try again later</p>
        </div>
      ) : null}
    </form>
  );
};

export default ApplicationForm;
