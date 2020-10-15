import React, { useState, useEffect, useContext } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
//import axios from "./axios";
import SwipeButtons from "../SwipeButtons/SwipeButtons";
import { UserContext } from "../reducer/reducer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

function TinderCards() {
  const [people, setPeople] = useState([]);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    if (!state) {
      history.push("/signin");
    }
  });

  useEffect(() => {
    // async function fetchData() {
    //   const req = await axios.get("/tinder/cards");
    //   setPeople(req.data);
    // }

    // fetchData();
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/posts/tinder/cards`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${token}`,
        },
      })
      .then((response) => {
        //  console.log(response.data);
        setPeople(response.data.posts);

        //setPosts(response)
      })
      .catch((error) => console.log(error.response));
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("removing" + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen");
  };
  return (
    <div className="tinderCards">
      <div className="tindercards__cardContainers">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person._id}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              className="card"
              style={{ backgroundImage: `url(${person.imgUrl})` }}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}

        <SwipeButtons />
      </div>
    </div>
  );
}

export default TinderCards;
