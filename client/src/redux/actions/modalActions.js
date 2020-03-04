import ACTIONS from "./types";

const showToggleModal = value => dispatch => {
  dispatch({
    type: ACTIONS.TOGGLE_MODAL,
    payload: value
  });
};

export default {
  showToggleModal
};
