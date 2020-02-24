//form actions
import formActions from "./formActions";
// recruiterActions
import jobActions from "./jobActions";
// recruiterActions
import recruiterActions from "./recruiterActions";
// userActions
import userActions from "./userActions";

export default {
  ...formActions,
  ...jobActions,
  ...recruiterActions,
  ...userActions
};
