import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import service from "../api/service";
import axios from "axios";
const API_URL = "http://localhost:3000/api";

export default function AddClimb() {
  let navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // ******** this method handles just the file upload ********
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    service
      .handleUpload(uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        setImageUrl(response.secure_url);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // this method submits the form
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, imageUrl };

    // axios
    //   .post(`${API_URL}/create`, requestBody)
    //   .then((response) => navigate("/climb/add"))
    //   .catch((error) => {
    //     const errorDescription = error.response;
    //     setErrorMessage(errorDescription);
    //   });
    console.log(imageUrl);
    service
      .saveNewClimb(requestBody)
      .then((res) => {
        console.log("added new climb: ", res);
        navigate("/climb/add");
      })
      .catch((err) =>
        console.log("Error while adding the new climb: ", err.message)
      );

    setTitle("");
    setImageUrl("no file chosen");
    setDescription("");
  };

  return (
    <div>
      <h2>Add a new Route</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>
          Name
          <input
            type="text"
            name="title"
            value={name}
            onChange={handleChange}
          />
        </label> */}

        {/* <label>Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        /> */}

        <input type="file" onChange={handleFileUpload} />
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        <button type="submit">Save new climb</button>
      </form>
    </div>
  );
}
