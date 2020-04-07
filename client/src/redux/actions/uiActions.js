import ACTIONS from "./types";

const setApplicationTimeFrame = e => dispatch => {
  const option = e.target.childNodes[e.target.selectedIndex].getAttribute(
    "data-value"
  );

  let year, month, timeframe;

  if (option === "all time") {
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    timeframe = "all time";
  } else {
    year = new Date(option).getFullYear();
    month = new Date(option).getMonth() + 1;
    timeframe = `${month} ${year}`;
  }

  dispatch({
    type: ACTIONS.APPLICATION_TIME_FRAME,
    payload: {
      currentTimeFrameMonth: month,
      currentTimeFrameYear: year,
      currentTimeFrame: timeframe
    }
  });
};

export default {
  setApplicationTimeFrame
};
