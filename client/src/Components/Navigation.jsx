// NPM Modules
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
// Context Provider
import { ContextProvider } from "../Context/ContextProvider";
// Components
import FirebaseAuthenticateButton from "./FirebaseAuthenticateButton";

const Navigation = () => {
  // Context
  const context = useContext(ContextProvider);
  // useLocation Hook
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            kgsdvksdvkjhg
          </NavLink>
        </li>
        {context.loggedIn ? (
          <>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/application"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Add Application
              </NavLink>
            </li>
          </>
        ) : null}
        {location.pathname !== "/signup" ? (
          <li>
            <FirebaseAuthenticateButton />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navigation;
