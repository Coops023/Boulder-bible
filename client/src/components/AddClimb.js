import React from "react";
import { useState } from "react";
import service from "../api/service";

export default function AddClimb() {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [typeOfClimb, setTypeOfClimb] = useState("");
  const [stars, setStars] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  // ******** this method handles just the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        setImageUrl(response.secure_url);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  // this method submits the form
  const handleSubmit = (e) => {
    e.preventDefault();

    service
      .saveNewClimb(imageUrl)
      .then((res) => {
        console.log("added new climb: ", res);
        // here you would redirect to some other page
      })
      .catch((err) => console.log("Error while adding the new climb: ", err));
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

        <button type="submit">Save new climb</button>
      </form>
    </div>
  );
}
