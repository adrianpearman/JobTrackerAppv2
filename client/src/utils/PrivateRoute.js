import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ui: ui, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        ui.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    ui: state.ui
  };
};

export default connect(mapStateToProps)(PrivateRoute);
