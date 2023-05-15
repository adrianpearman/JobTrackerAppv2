import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../redux/actions";
import CapitalizeContent from "../../utils/capitalizeContent";

const CompanyList = ({
  fetchApplicationsFromCompanyList,
  fullList,
  letters,
}) => {
  const [companyLetter, setCompanyLetter] = useState();
  const [viewFullList, setViewFullList] = useState(true);

  useEffect(() => {
    fetchApplicationsFromCompanyList();
  }, []);

  let companies = Object.entries(letters);

  return (
    <div className="row">
      <div className="col-12 my-3">
        <h1 style={{ textAlign: "center" }}>List of Companies</h1>
      </div>

      <div className="col-10 offset-1 row my-3">
        <input
          className="form-control col-8"
          type="text"
          placeholder="Search"
        />
        <button className="btn btn-primary col-3 offset-1"> Search </button>
      </div>

      <div className="col-10 offset-1 row mt-3">
        <div className="col-3">
          <div>
            <p
              onClick={() => {
                setViewFullList(true);
              }}
            >
              Full List of Companies
            </p>
          </div>
          <div>
            <p>Search by Letter</p>

            <ul className="list-group">
              {companies.map((company, index) => {
                return company[1].length > 0 ? (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                    onClick={() => {
                      setViewFullList(false);
                      setCompanyLetter(company[0]);
                    }}
                  >
                    {CapitalizeContent(company[0])}
                    <span className="badge badge-primary badge-pill">
                      {company[1].length}
                    </span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
        <div className="col-9">
          {viewFullList ? (
            <div className="card bg-secondary mb-3">
              <div className="card-header">Full Companies List</div>
              <div className="card-body">
                <ul className="list-group">
                  {fullList.map((company, index) => {
                    return (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <Link to={`/companies/${company}`}>{company}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            <>
              {companies.map((company, index) => {
                return company[1].length > 0 ? (
                  <>
                    {companyLetter === company[0] ? (
                      <div className="card bg-secondary mb-3">
                        <div className="card-header">
                          Companies Beginning with an{" "}
                          {CapitalizeContent(company[0])}
                        </div>
                        <div className="card-body">
                          <ul key={index}>
                            {company[1].map((comp, i) => {
                              return (
                                <li
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                  key={i}
                                >
                                  <Link to={`/companies/${comp}`}>{comp}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    fullList: application.companyList.companyNameContainer,
    letters: application.companyList.letters,
  };
};

const mapDispatchToProps = {
  fetchApplicationsFromCompanyList: actions.fetchApplicationsFromCompanyList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);
