// NPM Modules
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
// Context
import { ContextProvider } from "../Context/ContextProvider";
// Helper Functions
import {
  fetchLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
} from "../helperFunctions/localStorageFunctions";
import axiosClient from "../helperFunctions/axiosClient";
import auth from "../firebase/firebaseConfig";

const RootProvider = ({ children }) => {
  const local = fetchLocalStorage();
  // State
  const [isLoggedIn, setIsLoggedIn] = useState({
    loggedIn: false,
    user: local,
  });

  const onAuthStateChange = (cb) => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await axiosClient({
            method: "GET",
            url: "/api",
            headers: {
              AuthToken: user.accessToken,
            },
          });
          //
          setLocalStorage(user);
          //
          cb({
            loggedIn: true,
            user: user,
          });
        } catch (err) {
          //
          deleteLocalStorage(); //
          cb({
            loggedIn: false,
            user: {},
          });
        }
      } else {
        //
        deleteLocalStorage(); //
        cb({
          loggedIn: false,
          user: {},
        });
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setIsLoggedIn);

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <ContextProvider.Provider value={isLoggedIn}>
      {children}
    </ContextProvider.Provider>
  );
};

export default RootProvider;
