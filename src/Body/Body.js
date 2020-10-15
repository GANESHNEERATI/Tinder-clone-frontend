import React, { useEffect, useContext } from "react";

import TinderCards from "../TinderCards/TinderCards";

import SignUp from "../SignIN/SignUp";
import CreatePost from "../CreatePost/CreatePost";
import UserProfile from "../UserProfile/UserProfile";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import SignIN from "../SignIN/SignIN";
import { reducer, initialState, UserContext } from "../reducer/reducer";

function Body() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <div>
      <Switch>
        {/* <SignUp /> */}
        <Route path="/signup">
          <SignUp />
        </Route>

        {/*<SignIn/> */}
        <Route path="/signin">
          <SignIN />
        </Route>
        {/* create post*/}
        <Route path="/createpost">
          <CreatePost />
        </Route>
        {/* profile */}
        <Route path="/profile">
          <UserProfile />
        </Route>
        {/*home */}
        <Route path="/">
          <TinderCards />
        </Route>
      </Switch>
    </div>
  );
}

export default Body;
