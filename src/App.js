import React, { useEffect, useReducer, useContext } from "react";

import "./App.css";
import Headder from "./Headder/Headder";
import TinderCards from "./TinderCards/TinderCards";

import SignUp from "./SignIN/SignUp";
import CreatePost from "./CreatePost/CreatePost";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import SignIN from "./SignIN/SignIN";
import { reducer, initialState, UserContext } from "./reducer/reducer";
import Body from "./Body/Body";

/* function Body() {
  /* const { state, dispatch } = useContext(UserContext);
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/signin");
    }
  }); 
  return (
    
  );
} */

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          {/* Headder */}
          <Headder />
          <Body />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
