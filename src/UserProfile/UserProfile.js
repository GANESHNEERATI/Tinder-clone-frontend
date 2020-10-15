import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../reducer/reducer";
import "./UserProfile.css";
import axios from "axios";
import { PostAdd } from "@material-ui/icons";

function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const [url, setUrl] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!state) {
      history.push("/");
    }
  }, []);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    axios
      .get("http://localhost:8001/posts/tinder/mycards", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${token}`,
        },
      })
      .then((response) => {
        setPosts(response.data.myposts);
        setUrl(response.data.myposts[0].imgUrl);
        // console.log(response.data);
        //setPosts(response)
      })
      .catch((error) => console.log(error));
  });
  return (
    <div className="userProfile">
      <div className="userProfile__information">
        <div className="userphoto">
          <img src={url} alt="GA" />

          <div className="h3h3">
            {user ? (
              <div>
                <h3>Name:{user.name}</h3>
                <h3>Email:{user.email}</h3>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className="userProfile__photos">
        <div className="userProfile__text">
          <div className="text">
            <h3>posted photos</h3>
          </div>
        </div>
        <div className="gallary">
          {posts.map((post) => (
            <img key={post._id} src={post.imgUrl} alt="GA" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
