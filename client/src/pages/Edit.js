import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import MapForm from "../components/MapForm";

const Edit = ({ user, setUser }) => {
  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetch("/api/ping", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          history.push("/login");
        } else {
          return res.json();
        }
      })
      .then((data) => setUser(data));
  }, []);

  let initialForm = {};
  if (location.state) {
    initialForm = {
      title: location.state.artwork.title,
      artist_name: location.state.artwork.artist_name,
      content_text: location.state.artwork.content_text,
      city: location.state.artwork.city,
      country: location.state.artwork.country,
      lat: location.state.artwork.lat,
      lon: location.state.artwork.lon,
    };
  }

  const [uploadForm, setUploadForm] = useState(initialForm);
  const [coordUploadForm, setCoordUploadForm] = useState({});

  const handleChange = (e) => {
    setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Object.values(uploadForm).every(
      (value) => String(value).length > 1
    );
    if (validate) {
      fetch(`/api/artwork/${location.state.artwork.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...uploadForm }),
      }).then(() => {
        alert("Item successfully edited");
		history.push("/admin");
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="upload-form">
      {user && user.username && (
        <>
          <h2>Please use the form below to edit this item</h2>
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
              <span>Artist name</span>
            </label>
            <br />
            <br />
            <br />
            <p>
              <strong>Current location:</strong> {uploadForm.city},{" "}
              {uploadForm.country}
            </p>
            <br />
            <MapForm setCoordUploadForm={setCoordUploadForm} />
            <Button
              color="primary"
              className="about"
              onClick={() =>
                setUploadForm((uploadForm) => {
                  return { ...uploadForm, ...coordUploadForm };
                })
              }
            >
              Change location
            </Button>
            <p>Edit the story below:</p>
            <textarea
              className="story-input"
              type="text"
              name="content_text"
              value={uploadForm.content_text}
              onChange={handleChange}
              placeholder=""
            />
            <br />
            <br />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Edit;
