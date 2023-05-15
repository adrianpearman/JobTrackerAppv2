import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MobileHeader = ({ ui }) => {
  let [toggleHiddenClass, setToggleHiddenClass] = useState(true);
  let [mobileClassName, setMobileClassName] = useState(
    "navigation__mobile__item--container navigation__hidden"
  );

  const HideMobileNavHandler = () => {
    toggleHiddenClass
      ? setMobileClassName("navigation__mobile__item--container")
      : setMobileClassName(
          "navigation__mobile__item--container navigation__hidden"
        );
    setToggleHiddenClass(!toggleHiddenClass);
  };

  return (
    <nav className="navigation__mobile">
      <span
        className="navigation__mobile__logo"
        onClick={() => {
          HideMobileNavHandler();
        }}
      >
        <p>Job Tracker</p>
      </span>

      <ul className={mobileClassName}>
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
    ui: ui,
  };
};
export default connect(mapStateToProps)(MobileHeader);
