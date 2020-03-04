import React from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";

const Modal = ({ toggleModal, modal }) => {
  const showHideClassName = modal.showModal
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <button onClick={() => toggleModal(false)} className="btn btn-primary">
          Submit Update
        </button>
        <button onClick={() => toggleModal(false)} className="btn btn-primary">
          Close
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ modal }) => {
  return {
    modal
  };
};

const mapDispatchToProps = {
  toggleModal: actions.showToggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
