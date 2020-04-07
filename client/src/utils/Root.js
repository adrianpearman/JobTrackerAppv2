import React from "react";
import { Provider } from "react-redux";
// Redux Store
import store from "../redux/store";

const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
