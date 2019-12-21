// NPM Modules
import React from "react";
// Redux
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// Redux Store
import store from "../redux/store";
// Components
import AddApplication from "./AddApplications/AddApplication";
import Header from "../containers/Header";
import LoginPage from "./UserActions/LoginPage";
import ErrorPage from "./ErrorPage";
import ViewApplications from "./ViewJobs";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={ViewApplications} exact />
            <Route path="/add" component={AddApplication} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/*" component={ErrorPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
