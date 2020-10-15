import React, { useState } from "react";
import { Button, Card, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./SignIN.css";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function SignUp() {
  const [username, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const classes = useStyles();

  const signUp = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setMsg("Invalid Email");

      return;
    }

    axios
      .post("http://localhost:8001/api/signup", {
        name: username,
        email: email,
        password: password,
      })
      .then((response) => setMsg(response.data))

      .catch((error) => {
        setMsg(error.response.data.error);
      });

    setUserName("");
    setPassword("");
    setEmail("");
  };

  return (
    <div>
      <div className="signInCard">
        <div className="cardContainer">
          {<div className="header_toast">{msg && <h3>{msg}</h3>}</div>}
          <Card className={classes.root}>
            <form className="card__signup">
              <center>
                <img
                  className="app_headerImage"
                  src="https://www.pngitem.com/pimgs/m/242-2424536_tinder-logo-tinder-logo-png-2019-transparent-png.png"
                  alt=""
                />
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signUp}>Sign Up</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
