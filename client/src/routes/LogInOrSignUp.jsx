// NPM Modules
import { useState } from "react";
// Components
import CreateUserForm from "../Components/CreateUserForm";
import LogInForm from "../Components/LogInForm";

const LogInOrSignUp = () => {
  const [showLogInForm, setShowLogInForm] = useState(true);

  return (
    <div>
      <h2>Sign Up / Log In</h2>
      <div>
        {!showLogInForm ? (
          <button onClick={() => setShowLogInForm(true)}>Sign In</button>
        ) : (
          <button onClick={() => setShowLogInForm(false)}>
            Create Account
          </button>
        )}
      </div>
      <div>{showLogInForm ? <LogInForm /> : <CreateUserForm />}</div>
    </div>
  );
};

export default LogInOrSignUp;
