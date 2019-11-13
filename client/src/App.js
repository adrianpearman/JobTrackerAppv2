// NPM Modules
import React from "react";
// Redux
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
// Redux Store
import store from "./redux/store";

// Reusable Functions
import { onInputHandler, onClickHandler } from "./utils/resuableFunctions";

// Components
import TestComponent from "./components/test";

class App extends React.Component {
  state = {
    userId: "5cfbe3c271d5ee293ab8a643",
    jobId: "5d01502649763c11a6f41c5a",
    companyName: "",
    applicationLink: "",
    applicationMonth: "",
    applicationYear: "",
    response: "",
    interview: "",
    hired: "",
    hiredDateMonth: "",
    hiredDateYear: "",
    lastDayWorkedMonth: "",
    lastDayWorkedYear: ""
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route
            component={() => (
              <TestComponent
                onInputHandler={onInputHandler}
                onClickHandler={onClickHandler}
              />
            )}
          />
        </Router>
      </Provider>
    );
  }
}

export default App;

// function addToString(array, word){
//   let newArray = []
//   for (let index = 0; index < array.length; index++) {
//     const element = array[index]+ ' ' + word;
//     newArray.push(element)
//   }
//   return newArray
// }

// function addToString(array, newWord){
//   let newArray = array.map(word => `${word} + ${newWord}`)
//   return newArray
// }
