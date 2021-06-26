import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import MapForm from "../components/MapForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "absolute",
    height: "4em",
    backgroundColor: "#7d69af",
    fontFamily: "Righteous",
    marginBottom: "2em",
  },
  title: {
    marginLeft: theme.spacing(5),
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Righteous",
  },
  form: {
    display: "grid",
    width: "50%",
    margin: "auto",
    placeItems: "center",
    margin: "4em 25% 0 25%",
    fontFamily: "Righteous",
    backgroundColor: "#d1c2f7",
  },
  map_header: {
    fontSize: "1.25em",
  },
  media: {
    color: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "6em",
    fontFamily: "Righteous",
    fontSize: "1.5rem",
  },
}));

const Edit = ({ user, setUser }) => {
  let history = useHistory();
  const location = useLocation();
  const classes = useStyles();

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
    initialForm = location.state.artwork;
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
      {user && user.username && location.state && (
        <>
          <h2>Please use the form below to edit this item</h2>
          <form className="form" onSubmit={handleSubmit}>
            <ListItem>
              <TextField
                autoFocus
                margin="dense"
                label="Title of the art work"
                placeholder="Title of the art work"
                type="text"
                name="title"
                fullWidth
                variant="outlined"
                value={uploadForm.title}
                onChange={handleChange}
              />
            </ListItem>
            <ListItem>
              <TextField
                margin="dense"
                label="Artist name, full name or nickname"
                placeholder="Artist name, full name or nickname"
                type="text"
                name="artist_name"
                fullWidth
                variant="outlined"
                value={uploadForm.artist_name}
                onChange={handleChange}
              />
            </ListItem>
            <ListItem className={classes.map_header}>
              <strong>Current location:</strong> {uploadForm.city},{" "}
              {uploadForm.country}
            </ListItem>
            <ListItem>
              <MapForm setCoordUploadForm={setCoordUploadForm} />
            </ListItem>
            <ListItem>
              <Button
                style={{ backgroundColor: "white" }}
                color="secondary"
                variant="outlined"
                onClick={() =>
                  setUploadForm((uploadForm) => {
                    return { ...uploadForm, ...coordUploadForm };
                  })
                }
              >
                Change location
              </Button>
            </ListItem>
            <ListItem>
              <div className="center">
                <strong>Media type:</strong> {uploadForm.content_type}
              </div>
            </ListItem>

            {(uploadForm.content_type === "text" ||
              uploadForm.content_type === "image") && (
                <ListItem>
                  <TextField
                    label="Please edit the story here"
                    placeholder="Please edit the story here"
                    multiline
                    variant="outlined"
                    type="text"
                    name="story"
                    fullWidth
                    value={uploadForm.content_text}
                    onChange={handleChange}
                  />
                </ListItem>
              )}
            {uploadForm.content_type === "image" && (
              <ListItem>
                <div style={{display:"flex", alignContent:"center", justifyItems:"center"}}>
                  <img
                    component="img"
                    alt={uploadForm.title}
                    height="240px"
                    width="auto"
					margin="auto"
                    src={uploadForm.content_link}
                  />
                </div>
              </ListItem>
            )}
            {uploadForm.content_type === "video" && (
              <ListItem>
                <video width="100%" height="240" controls>
                  <source src={uploadForm.content_link} type="video/mp4" />
                </video>
              </ListItem>
            )}
            {uploadForm.content_type === "music" && (
              <ListItem>
                <audio controls style={{ display: "flex", width: "100%" }}>
                  <source src={uploadForm.content_link} />
                </audio>
              </ListItem>
            )}
            <ListItem>
              <button type="submit" className="btn">
                Save edits
              </button>
            </ListItem>
          </form>
        </>
      )}
    </div>
  );
};

export default Edit;
