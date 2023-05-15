// NPM Modules
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
// Context
import { ContextProvider } from "../Context/ContextProvider";
// Firebase Config
import auth from "../firebase/firebaseConfig";

const FirebaseAuthenticateButton = () => {
  // Context
  const context = useContext(ContextProvider);
  // React Router Dom useNavigate Hook
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  return (
    <button
      onClick={() => {
        context.loggedIn ? handleSignOut() : navigate("/signup");
      }}
    >
      {context.loggedIn ? "Sign Out" : "Sign In"}
    </button>
  );
};

export default FirebaseAuthenticateButton;
