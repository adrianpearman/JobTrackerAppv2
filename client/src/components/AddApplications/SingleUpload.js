import React from "react";
// Redux
import { connect } from "react-redux";
import { onInputHandler } from "../../redux/actions/index";

const SingleUpload = props => {
  return (
    <>
      <div className="col-8 offset-2">
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            className="form-control"
            type="text"
            id="companyName"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="applicationLink">Application Link</label>
          <input
            className="form-control"
            type="text"
            id="applicationLink"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="applicationMonth">Application Month</label>
          <input
            className="form-control"
            type="text"
            id="applicationMonth"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="applicationYear">Application Year</label>
          <input
            className="form-control"
            type="text"
            id="applicationYear"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="response">Response?</label>
          <select
            className="form-control"
            id="response"
            onChange={e => props.onInputHandler(e)}
          >
            <option>Select a new value</option>
            <option>true</option>
            <option>false</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interview">Interview?</label>
          <select
            className="form-control"
            id="interview"
            onChange={e => props.onInputHandler(e)}
          >
            <option>Select a new value</option>
            <option>true</option>
            <option>false</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hired">Hired?</label>
          <select
            className="form-control"
            id="hired"
            onChange={e => props.onInputHandler(e)}
          >
            <option>Select a new value</option>
            <option>true</option>
            <option>false</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hiredDateMonth">Hired Month</label>
          <input
            className="form-control"
            type="number"
            id="hiredDateMonth"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="hiredDateYear">Hired Year</label>
          <input
            className="form-control"
            type="number"
            id="hiredDateYear"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastDayWorkedMonth">Last Day Worked (Month)</label>
          <input
            className="form-control"
            type="number"
            id="lastDayWorkedMonth"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastDayWorkedYear">Last Day Worked (Year)</label>
          <input
            className="form-control"
            type="number"
            id="lastDayWorkedYear"
            onChange={e => props.onInputHandler(e)}
          />
        </div>

        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={e => props.onInputHandler(e)}
        >
          Submit Application
        </button>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    jobs: state.jobs
  };
};

export default connect(mapStateToProps, { onInputHandler })(SingleUpload);
