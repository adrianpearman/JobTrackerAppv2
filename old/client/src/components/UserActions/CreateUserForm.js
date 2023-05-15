import React from "react";

const CreateUserForm = () => {
  return (
    <div className="col-10 offset-1 mb-3">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input className="form-control" type="text" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input className="form-control" type="text" id="email" />
        </div>
        <div className="form group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="passwosrd"
            id="password"
            autoComplete="on"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
