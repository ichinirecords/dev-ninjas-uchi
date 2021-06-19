import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MapForm from "../components/MapForm"
const Upload = () => {
  const history = useHistory();
  const [uploadForm, setUploadForm] = useState({
    title: "",
    artist_name: "",
    story: "",
  });
  const [coordUploadForm, setCoordUploadForm] = useState({})
  const handleChange = (e) => {
    setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Object.values(uploadForm).every((key) => key.length > 1);
    if (validate) {
      fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...uploadForm, ...coordUploadForm }),
      }).then(() => {
        alert("Your story is successfully uploaded, waiting to be verified");
      });
      history.push("/");
    } else {
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
        <br />
        <br />
        <MapForm setCoordUploadForm={setCoordUploadForm} />
        <br />
        <div>
          <div>
            <h3>Please choose the media type you want to upload</h3>
            <div className="radio-container">
              <input className="radio-input" id={`video`} type="radio" name="media-type" value='video' />
              <label className="radio-label" htmlFor={`video`}>
                Video
              </label>
              <input className="radio-input" id={`image`} type="radio" name="media-type" value='image' />
              <label className="radio-label" htmlFor={`image`}>
                Image
              </label>
              <input className="radio-input" id={`music`} type="radio" name="media-type" value='music' />
              <label className="radio-label" htmlFor={`music`}>
                Music
              </label>
              <input className="radio-input" id={`text`} type="radio" name="media-type" value='text' />
              <label className="radio-label" htmlFor={`text`}>
                Text
              </label>
            </div>
          </div>
        </div>
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
