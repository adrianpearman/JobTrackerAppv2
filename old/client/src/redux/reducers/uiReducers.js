import ACTIONS from "../actions/types";

const initialState = {
  isLoggedIn: true,
  currentTimeFrameMonth: new Date().getMonth() + 1,
  currentTimeFrameYear: new Date().getFullYear(),
  currentTimeFrame: "all time"
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.APPLICATION_TIME_FRAME: {
      const {
        currentTimeFrameMonth,
        currentTimeFrameYear,
        currentTimeFrame
      } = action.payload;
      return {
        ...state,
        currentTimeFrameMonth,
        currentTimeFrameYear,
        currentTimeFrame
      };
    }
    default:
      return state;
  }
};
