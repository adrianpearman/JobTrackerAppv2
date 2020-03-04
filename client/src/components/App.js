// NPM Modules
import React from "react";
// Redux
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// Redux Store
import store from "../redux/store";
import history from "../utils/history";
// Components
import PrivateRoute from "../utils/PrivateRoute";
import Header from "../containers/Header/Header";
import LoginPage from "./UserActions/LoginPage";
import ErrorPage from "./ErrorPage";
// Pages
import AddApplication from "./Applications/Jobs/AddApplication";
import AddRecruiter from "./Applications/Recruiter/AddRecruiter";
import ViewApplications from "./ViewApplicationData/ViewApplications";
import ViewRecruiters from "./ViewRecruiterData/ViewRecruiters";
import AdminContent from "./Admin/AdminContent";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" component={ViewApplications} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/recruiters" component={ViewRecruiters} exact />
          <PrivateRoute
            path="/admin/add/application"
            component={AddApplication}
            exact
          />
          <PrivateRoute
            path="/admin/add/recruiter"
            component={AddRecruiter}
            exact
          />
          <PrivateRoute path="/admin/content" component={AdminContent} exact />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
