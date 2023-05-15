import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../redux/actions";
import Tabs from "../../containers/Tab";
import LineChart from "../../containers/Charts/LineChart";
import PieChart from "../../containers/Charts/PieChart";
import TableContainer from "../../containers/Table/TableContainer";

const CompanySingle = ({ currentCompany, loadCompanies, match }) => {
  useEffect(() => {
    loadCompanies(match.params.company);
  }, []);

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <Link to="/companies">Return to Companies</Link>
        <h1>Showing results for: {currentCompany.companyName}</h1>
        <Tabs>
          <div title="Application Conversion">
            <PieChart
              data={currentCompany.applicationResponses}
              recruiter={false}
            />
          </div>
          <div title="Application History">
            <LineChart data={currentCompany.applicationsPerMonth} />
          </div>
        </Tabs>
        <div>
          <p>{currentCompany.applications.length} applications</p>
          <TableContainer
            data={currentCompany.applications}
            recruiter={false}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ application, recruiter }) => {
  return {
    currentCompany: application.currentCompany,
    currentRecruiter: recruiter,
  };
};

const mapDispatchToProps = {
  loadCompanies: actions.fetchApplicationsFromCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySingle);
