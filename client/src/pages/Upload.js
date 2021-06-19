import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MapForm from "../components/MapForm"
const Upload = () => {
  const history = useHistory();
  const [uploadForm, setUploadForm] = useState({
    title: "",
    artist_name: "",
    city: "",
    country: "",
    story: "",
  });
  const handleChange = (e) => {
    setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Object.values(uploadForm).every((key) => key.length > 1);
    if(validate){  
    fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadForm),
    }).then(() => {
      alert("Your story is successfully uploaded, waiting to be verified");
    });
    history.push("/");
  }else{
    alert("Please fill in all fields");
  }
  };
  return (
    <div className="upload-form">
      <h2>Please use the form below to tell us your story...</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="has-float-label">
          <input
            type="text"
            name="title"
            value={uploadForm.title}
            onChange={handleChange}
            placeholder="Art title"
          />
          <span>Art title</span>
        </label>
        <br />
        <br />
        <label className="has-float-label">
          <input
            type="text"
            name="artist_name"
            value={uploadForm.artist_name}
            onChange={handleChange}
            placeholder="Full name"
          />
          <span>Your name</span>
        </label>
        <br />
        <br />
        <label className="has-float-label">
          <input
            type="text"
            name="city"
            value={uploadForm.city}
            onChange={handleChange}
            placeholder="Town/City"
          />
          <span>Town/city</span>
        </label>
        <br />
        <br />
        <label className="has-float-label">
          <input
            type="text"
            name="country"
            value={uploadForm.country}
            onChange={handleChange}
            placeholder="Country"
          />
          <span>Country</span>
        </label>
        <br />
        <br />
        <MapForm uploadForm = {uploadForm} setUploadForm={setUploadForm}/>
        <p>Please tell us your story below:</p>
        <textarea
          className="story-input"
          type="text"
          name="story"
          value={uploadForm.story}
          onChange={handleChange}
          placeholder=""
        />
        <br />
        <br />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Upload;
