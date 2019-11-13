import React from "react";

// Redux
import { connect } from "react-redux";
import { onInputHandler } from "../redux/actions/index";

const test = props => {
  return (
    <div>
      {/* <input type='text' id='companyName' onChange={(e) => props.onInputHandler(e)}/> */}
      <input
        type="text"
        id="companyName"
        onChange={e => props.onInputHandler(e, props.state)}
      />
      <input
        type="text"
        id="applicationLink"
        onChange={e => props.onInputHandler(e)}
      />
      <input
        type="number"
        id="applicationMonth"
        onChange={e => props.onInputHandler(e)}
      />
      <input
        type="number"
        id="applicationYear"
        onChange={e => props.onInputHandler(e)}
      />
      <select id="response" onChange={e => props.onInputHandler(e)}>
        <option>Select a new value</option>
        <option>true</option>
        <option>false</option>
      </select>
      <select id="interview" onChange={e => props.onInputHandler(e)}>
        <option>Select a new value</option>
        <option>true</option>
        <option>false</option>
      </select>
      <select id="hired" onChange={e => props.onInputHandler(e)}>
        <option>Select a new value</option>
        <option>true</option>
        <option>false</option>
      </select>
      <input
        type="number"
        id="hiredDateMonth"
        onChange={e => props.onInputHandler(e)}
      />
      <input
        type="number"
        id="hiredDateYear"
        onChange={e => props.onInputHandler(e)}
      />
      <input
        type="number"
        id="lastDayWorkedMonth"
        onChange={e => props.onInputHandler(e)}
      />
      <input
        type="number"
        id="lastDayWorkedYear"
        onChange={props.onInputHandler}
      />
      <button onClick={e => props.onInputHandler(e)}>Click</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    jobs: state.jobs
  };
};

export default connect(mapStateToProps, { onInputHandler })(test);
