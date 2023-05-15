import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const DeskTopHeader = ({ ui }) => {
  return (
    <nav className="navigation">
      <span className="navigation__logo">
        <p className="navigation__logo--text">Job Tracker</p>
      </span>

      <ul className="navigation__item--container">
        <li className="navigation-item">
          <Link className="nav-link" to="/">
            View Jobs
          </Link>
        </li>
        <li className="navigation-item">
          <Link className="nav-link" to="/recruiters">
            View Recruiters
          </Link>
        </li>
        <li className="navigation-item">
          <Link className="nav-link" to="/companies">
            Company List
          </Link>
        </li>
        {ui.isLoggedIn ? (
          <>
            <li className="navigation-item">
              <Link className="nav-link" to="/admin/add/application">
                Add Application
              </Link>
            </li>
            <li className="navigation-item">
              <Link className="nav-link" to="/admin/add/recruiter">
                Add Recruiter
              </Link>
            </li>
            <li className="navigation-item">
              <Link className="nav-link" to="/admin/content">
                Admin Panel
              </Link>
            </li>
          </>
        ) : null}
        <li className="navigation-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ ui }) => {
  return {
    ui,
  };
};

export default connect(mapStateToProps)(DeskTopHeader);
