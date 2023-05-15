import React from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";

const Modal = ({ toggleModal, modal }) => {
  const showHideClassName = modal.showModal
    ? "modal display-block"
    : "modal display-none";

  return (
    <div
      className={showHideClassName}
      onClick={e => {
        e.preventDefault();
        toggleModal(false);
      }}
    >
      <div
        className="modal-main"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input className="form-control" type="text" id="companyName" />
          </div>

          <div className="button-container">
            <button
              onClick={() => toggleModal(false)}
              className="btn btn-primary"
            >
              Submit Update
            </button>
            <button
              onClick={() => toggleModal(false)}
              className="btn btn-primary"
            >
              Close
            </button>
          </div>
        </div>
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
