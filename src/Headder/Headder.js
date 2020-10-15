import React, { useEffect, useState, useContext } from "react";
import "./Headder.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../reducer/reducer";

function Headder() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/signin");
  };

  /** const renderList = () => {
    if (state) {
      return [
        <div className="headder__buttons">
          <Button onClick={logout}>Logout</Button>
          <Button onClick={() => history.push("/createpost")}>Add photo</Button>
        </div>,
      ];
    } else {
      return [
        <div className="headder__buttons">
          <Button onClick={() => history.push("/signup")}>Signup</Button>
          <Button onClick={() => history.push("/signin")}>Signin</Button>
        </div>,
      ];
    }
  }; **/

  return (
    <div className="headder">
      <IconButton>
        <PersonIcon fontSize="large" className="headder__icon" />
      </IconButton>
      <Link to="/">
        <img
          className="headder__logo"
          src="https://metiza.com/wp-content/uploads/2018/09/tinder-logo.jpg"
          alt=""
        />
      </Link>
      {state ? (
        <div className="headder__buttons">
          <Button onClick={logout}>Logout</Button>
          <Button onClick={() => history.push("/createpost")}>Add photo</Button>
          <Button onClick={() => history.push("/profile")}>Profile</Button>
        </div>
      ) : (
        <div className="headder__buttons">
          <Button onClick={() => history.push("/signup")}>Signup</Button>
          <Button onClick={() => history.push("/signin")}>Signin</Button>
        </div>
      )}
    </div>
  );
}

export default Headder;
