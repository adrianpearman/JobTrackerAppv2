// NPM Modules
import React from "react";
// Redux
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// Redux Store
import store from "../redux/store";
// Components
import Header from "../containers/Header";
import LoginPage from "./UserActions/LoginPage";
import ErrorPage from "./ErrorPage";
// Pages
import AddApplication from "./Applications/Jobs/AddApplication";
import AddRecruiter from "./Applications/Recruiter/AddRecruiter";
import ViewApplications from "./ViewApplicationData/ViewJobs";
import ViewRecruiters from "./ViewRecruiterData/ViewRecruiters";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={ViewApplications} exact />
          <Route path="/recruiters" component={ViewRecruiters} exact />
          <Route path="/add/application" component={AddApplication} exact />
          <Route path="/add/recruiter" component={AddRecruiter} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
