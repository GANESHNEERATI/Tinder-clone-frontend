import React, { useState, useEffect, useContext } from "react";
import { Button, Input } from "@material-ui/core";
import "./CreatePost.css";
import axios from "axios";
import dotenv from "dotenv";
import { useHistory } from "react-router-dom";
import { UserContext } from "../reducer/reducer";

dotenv.config();

function CreatePost() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!state) {
      history.push("/signin");
    }
  });

  useEffect(() => {
    if (url) {
      console.log(url, name);
      const token = localStorage.getItem("jwt");
      console.log("in use effect");
      // console.log(token)

      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/posts/tinder/cards`,
          {
            name: name,
            pic: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          history.push("/");
        })
        .catch((error) => console.log(error.response.data));
    }
  }, [url]);
  const postPhoto = () => {
    //console.log(process.env.REACT_APP_UPLOAD_URL);
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "tinder-posts");
    data.append("cloud_name", "ganiwalker");

    axios
      .post(`${process.env.REACT_APP_UPLOAD_URL}/image/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        // setUrl(res.data.url)

        setUrl(data.data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    //getting token from local storage
    //console.log(name)
    console.log(url);

    // postinDB();
  };

  return (
    <div className="post__photo">
      <div className="photo__input">
        <div>
          <h5>Name:</h5>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
        </div>

        <div>
          <h5>Post your photo:</h5>
          <Input type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>
      </div>

      <Button onClick={postPhoto}>submit</Button>
    </div>
  );
}

export default CreatePost;
