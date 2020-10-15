import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Card, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./SignIN.css";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../reducer/reducer";
import dotenv from "dotenv";

dotenv.config();

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

function SignIN() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const signIn = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return setMsg("Invalid Email");
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/Signin`, {
        email: email,
        password: password,
      })

      .then((response) => {
        console.log(response);

        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user1));
        dispatch({ type: "USER", payload: response.data.user1 });

        //console.log(response.data.user1)

        history.push("/");
      })

      .catch((error) => {
        setMsg("");
        if (error.response.data.error) {
          setMsg(error.response.data.error);
        } else {
          setMsg(error.response.data);
        }
      });

    setPassword("");
    setEmail("");
  };

  return (
    <div className="signInCard">
      <div className="cardContainer">
        <Card className={classes.root}>
          <div className="header_toast">{msg && <h3>{msg}</h3>}</div>

          <form className="card__signup">
            <center>
              <img
                className="app_headerImage"
                src="https://www.pngitem.com/pimgs/m/242-2424536_tinder-logo-tinder-logo-png-2019-transparent-png.png"
                alt=""
              />
            </center>

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
            <Button onClick={signIn}>Sign In</Button>
          </form>
          <div className="donthave">
            <h3>
              Don't have an Account <Link to="/signup"> Signup</Link>
            </h3>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SignIN;
