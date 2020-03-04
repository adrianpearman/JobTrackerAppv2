import ACTIONS from "../actions/types";

const INITIAL_STATE = {
  showModal: false
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    default:
      return state;
  }
};
