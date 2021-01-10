import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import authReducer from "../reducers/authentication.reducer";
import { setCurrentUser } from "../actions/authentication.action";
import jwt_decode from "jwt-decode";

export const AuthGlobal = React.createContext();

let initialState = {
  isAuthenticated: false,
  user: {},
};

const Auth = (props) => {
  let history = useHistory();
  if (localStorage.jwt) {
    initialState.isAuthenticated = true;
    try {
      initialState.user = jwt_decode(localStorage.jwt);
      localStorage.removeItem("github");
    } catch (error) {
      localStorage.removeItem("jwt");
      history.push("/");
    }
  }
  if (localStorage.github) {
    initialState.isAuthenticated = true;
    let github = JSON.parse(localStorage.github);
    try {
      initialState.user = {
        'email': github.email,
        'displayName': github.displayName,
      };
    } catch (error) {
      localStorage.removeItem("github");
      history.push("/");
    }
  }
  const [stateUser, dispatch] = useReducer(authReducer, initialState);
  
  if (localStorage.jwt && stateUser.isAuthenticated === false) {
    const userToken = localStorage.jwt ? localStorage.jwt : "";
    dispatch(setCurrentUser(jwt_decode(userToken)));
  }

  return (
    <AuthGlobal.Provider
      value={{
        stateUser,
        dispatch,
      }}
    >
      {props.children}
    </AuthGlobal.Provider>
  );
};

export default Auth;