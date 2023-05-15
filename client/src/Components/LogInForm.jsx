// NPM Modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
// Firebase Config
import auth from "../firebase/firebaseConfig";

const LogInForm = () => {
  // Navigate Hook
  const navigate = useNavigate();
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [logInError, setLogInError] = useState(false);

  const handleInputChange = (e, state) => {
    if (state === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email === "") {
      setFormError(true);
    } else if (password === "") {
      setFormError(true);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setFormError(false);
        setLogInError(false);
        navigate("/");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setLogInError(true);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSignIn(e);
      }}
    >
      <div className="">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            handleInputChange(e, "email");
          }}
        />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            handleInputChange(e, "password");
          }}
        />
      </div>
      <div className="">
        <button>Sign In</button>
      </div>
      {formError ? (
        <div>
          <p>Error! Please check the email and/or password</p>
        </div>
      ) : null}
      {logInError ? (
        <div>
          <p>
            Error! User not found please check credentials or create account
          </p>
        </div>
      ) : null}
    </form>
  );
};

export default LogInForm;
