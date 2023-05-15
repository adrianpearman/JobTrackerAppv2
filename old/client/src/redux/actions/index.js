//form actions
import formActions from "./formActions";
// recruiterActions
import jobActions from "./applicationActions";
// modalActions
import modalActions from "./modalActions";
// recruiterActions
import recruiterActions from "./recruiterActions";
//UI Actions
import uiActions from "./uiActions";
// userActions
import userActions from "./userActions";

export default {
  ...formActions,
  ...jobActions,
  ...modalActions,
  ...recruiterActions,
  ...uiActions,
  ...userActions
};
