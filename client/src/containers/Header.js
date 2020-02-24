import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ ui }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <h1>
        <Link className="navbar-brand" to="/">
          Job Tracker
        </Link>
      </h1>

      <div className="navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              View Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/recruiters">
              View Recruiters
            </Link>
          </li>
          {ui.isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/add/application">
                  Add Application
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add/recruiter">
                  Add Recruiter
                </Link>
              </li>
            </>
          ) : null}
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ ui }) => {
  return {
    ui
  };
};

export default connect(mapStateToProps)(Header);
