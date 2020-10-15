import React, { createContext } from "react";

const UserContext = createContext();

const initialState = null;

const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }

  return state;
};

export { reducer, initialState, UserContext };
