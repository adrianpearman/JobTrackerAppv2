import React from "react";
// Redux
import { connect } from "react-redux";
import actions from "../../../redux/actions/index";

const SingleUpload = ({ onInputHandler, onSubmitHandler, push }) => {
  return (
    <>
      <div className="col-8 offset-2">
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            className="form-control"
            type="text"
            id="companyName"
            onChange={e => onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="applicationLink">Application Link</label>
          <input
            className="form-control"
            type="text"
            id="applicationLink"
            onChange={e => onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="applicationPlatform">Application Platform</label>
          <select
            className="form-control"
            id="applicationPlatform"
            onChange={e => onInputHandler(e)}
          >
            <option value="angel">Angel List</option>
            <option value="glassdoor">Glassdoor</option>
            <option value="indeed">Indeed</option>
            <option value="linkedin">LinkedIn</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="applicationMonth">Application Month</label>
          <select
            className="form-control"
            id="applicationMonth"
            onChange={e => onInputHandler(e)}
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="applicationYear">Application Year</label>
          <input
            className="form-control"
            type="number"
            min="2017"
            id="applicationYear"
            onChange={e => onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="response">Response?</label>
          <select
            className="form-control"
            id="response"
            onChange={e => onInputHandler(e)}
          >
            <option value="0">Not Viewed</option>
            <option value="1">Representative Reached Out</option>
            <option value="2">Application Declined </option>
            <option value="3">Offer Provided</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interview">Interview?</label>
          <select
            className="form-control"
            id="interview"
            onChange={e => onInputHandler(e)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hired">Hired?</label>
          <select
            className="form-control"
            id="hired"
            onChange={e => onInputHandler(e)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hiredDateMonth">Hired Month</label>
          <select
            className="form-control"
            id="hiredDateMonth"
            onChange={e => onInputHandler(e)}
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hiredDateYear">Hired Year</label>
          <input
            className="form-control"
            type="number"
            min="2017"
            id="hiredDateYear"
            onChange={e => onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastDayWorkedMonth">Last Day Worked (Month)</label>
          <input
            className="form-control"
            type="number"
            id="lastDayWorkedMonth"
            onChange={e => onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastDayWorkedYear">Last Day Worked (Year)</label>
          <input
            className="form-control"
            type="number"
            min="2017"
            id="lastDayWorkedYear"
            onChange={e => onInputHandler(e)}
          />
        </div>

        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={e => onSubmitHandler(null, push)}
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

// NEdd to add in some additional error handling
