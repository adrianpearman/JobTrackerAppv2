import React from "react";
// Redux
import { connect } from "react-redux";
import actions from "../../../redux/actions/index";

const SingleUpload = ({ onInputHandler, onSubmitHandler }) => {
  return (
    <>
      <div className="col-8 offset-2">
        <div className="form-group">
          <label htmlFor="recruiterName">Recruiter Name</label>
          <input
            className="form-control"
            type="text"
            id="recruiterName"
            onChange={e => onInputHandler(e, "recruiter")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="recruiterCompany">Company Name</label>
          <input
            className="form-control"
            type="text"
            id="recruiterCompany"
            onChange={e => onInputHandler(e, "recruiter")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="recruiterRole">Role</label>
          <input
            className="form-control"
            type="text"
            id="recruiterRole"
            onChange={e => onInputHandler(e, "recruiter")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="recruiterMessage">Recruiter Message</label>
          <textarea
            className="form-control"
            id="recruiterMessage"
            rows="3"
            onChange={e => onInputHandler(e, "recruiter")}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="recruiterMonth">Month</label>
          <select
            className="form-control"
            id="recruiterMonth"
            onChange={e => onInputHandler(e, "recruiter")}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Select the Month
            </option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recruiterYear">Year</label>
          <input
            className="form-control"
            type="number"
            min="2017"
            id="recruiterYear"
            placeholder="2017"
            onChange={e => onInputHandler(e, "recruiter")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="recruiterPlatform">Platform</label>
          <select
            className="form-control"
            id="recruiterPlatform"
            onChange={e => onInputHandler(e, "recruiter")}
          >
            <option value="angel">Angel List</option>
            <option value="glassdoor">Glassdoor</option>
            <option value="indeed">Indeed</option>
            <option value="linkedin">LinkedIn</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recruiterLeadToInterview">Lead To Interview</label>
          <select
            className="form-control"
            id="recruiterLeadToInterview"
            onChange={e => onInputHandler(e, "recruiter")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recruiterLeadToRole">Lead To Role</label>
          <select
            className="form-control"
            id="recruiterLeadToRole"
            onChange={e => onInputHandler(e, "recruiter")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recruiterHiringInternal">
            Hiring For Internal Position
          </label>
          <select
            className="form-control"
            id="recruiterHiringInternal"
            onChange={e => onInputHandler(e, "recruiter")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recruiterHiringContract">
            Hiring For Contract Role
          </label>
          <select
            className="form-control"
            id="recruiterHiringContract"
            onChange={e => onInputHandler(e, "recruiter")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={e => onSubmitHandler("recruiter")}
        >
          Submit Application
        </button>
      </div>
    </>
  );
};

const mapStateToProps = ({ user, jobs }) => {
  return {
    user: user,
    jobs: jobs
  };
};

const mapDispatchToProps = {
  onInputHandler: actions.onInputHandler,
  onSubmitHandler: actions.onSubmitNewContentHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUpload);
