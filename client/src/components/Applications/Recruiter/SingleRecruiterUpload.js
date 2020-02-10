import React from "react";
// Redux
import { connect } from "react-redux";
import { onInputHandler } from "../../../redux/actions/index";

const SingleUpload = props => {
  return (
    <>
      <div className="col-8 offset-2">
        <div className="form-group">
          <label htmlFor="recruiterName">Recruiter Name</label>
          <input
            className="form-control"
            type="text"
            id="recruiterName"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterDate">Recruiter Date</label>
          <input
            className="form-control"
            type="text"
            id="recruiterDate"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterMonth">Month</label>
          <input
            className="form-control"
            type="text"
            id="recruiterMonth"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterYear">Year</label>
          <input
            className="form-control"
            type="text"
            id="recruiterYear"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterPlatform">Platform</label>
          <input
            className="form-control"
            type="text"
            id="recruiterPlatform"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterRole">Role</label>
          <input
            className="form-control"
            type="text"
            id="recruiterRole"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterLeadToRole">Lead To Role</label>
          <input
            className="form-control"
            type="text"
            id="recruiterLeadToRole"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterLeadToInterview">Lead To Interview</label>
          <input
            className="form-control"
            type="text"
            id="recruiterLeadToInterview"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterHiringInternal">
            Hiring For Internal Position
          </label>
          <input
            className="form-control"
            type="text"
            id="recruiterHiringInternal"
            onChange={e => props.onInputHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruiterCompany">Company Name</label>
          <input
            className="form-control"
            type="text"
            id="recruiterCompany"
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

const mapDispatchToProps = { onInputHandler };

export default connect(mapStateToProps, mapDispatchToProps)(SingleUpload);
