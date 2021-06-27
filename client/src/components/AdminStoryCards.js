import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Button } from "@material-ui/core";
import "./ArtistsStoryCards.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#bfacf0",
    height: "auto",
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 3,
  },
  searchBar: {
    marginLeft: 50,
  },
});

const AdminStoryCards = ({ user, approveMode }) => {
  const classes = useStyles();

  const [submittedArtwork, setSubmittedArtwork] = useState([]);
  const [filteredArtwork, setFilteredArtwork] = useState([]);
  const [search, setSearch] = useState("");

  const applySearch = (data) => {
    const filteredData = data.filter(
      (artwork) =>
        (artwork.title && artwork.title.toLowerCase().includes(search)) ||
        (artwork.artist_name &&
          artwork.artist_name.toLowerCase().includes(search))
    );
    return filteredData;
  };

  useEffect(() => {
    setFilteredArtwork(applySearch(submittedArtwork));
  }, [submittedArtwork, search]);

  useEffect(() => {
    if (approveMode) {
      fetch("/api/artwork?status=submitted")
        .then((res) => res.json())
        .then((data) => setSubmittedArtwork(data))
        .catch((err) => console.log(err));
    } else {
      fetch("/api/artwork")
        .then((res) => res.json())
        .then((data) => setSubmittedArtwork(data))
        .catch((err) => console.log(err));
    }
  }, [approveMode]);

  // function to accept/reject submitted artwork
  const changeStatus = (id, newStatus) => {
    fetch(`/api/artwork/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artwork_status: newStatus,
        decision_date: new Date(),
        admin_id: user.id,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          return "Unauthorised";
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.success) {
          alert(`Item successfully ${newStatus}`);
          fetch("/api/artwork?status=submitted")
            .then((res) => res.json())
            .then((data) => setSubmittedArtwork(data))
            .catch((err) => console.log(err));
        } else {
          alert("Could not change artwork status");
        }
      });
  };

  // function to delete an artwork item
  const deleteArtwork = (id) => {
    fetch(`/api/artwork/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          return "Unauthorised";
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.success) {
          alert(data.success);
          fetch("/api/artwork?status=submitted")
            .then((res) => res.json())
            .then((data) => setSubmittedArtwork(data))
            .catch((err) => console.log(err));
        } else {
          alert("Could delete item");
        }
      });
  };

  return (
    <>
      {!approveMode && (
        <TextField
          className={classes.searchBar}
          variant="filled"
          margin="normal"
          id="search"
          label="Search by title or artist name"
          name="email"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      )}
      <div className="cards-wrapper">
        {filteredArtwork.length > 0 &&
          filteredArtwork.map((artwork, index) => {
            return (
              <Card key={artwork.id} className={classes.root}>
                <CardContent>
                  {artwork.content_type === "image" && (
                    <CardMedia
                      className="card-img"
                      component="img"
                      alt={artwork.title}
                      height="240"
                      image={artwork.content_link}
                      title={artwork.title}
                    />
                  )}
                  {artwork.content_type === "video" && (
                    <video width="100%" height="240" controls>
                      <source src={artwork.content_link} type="video/mp4" />
                    </video>
                  )}
                  {artwork.content_type === "music" && (
                    <audio controls style={{ display: "flex", width: "100%" }}>
                      <source src={artwork.content_link} />
                    </audio>
                  )}
                  <Typography
                    variant="h3"
                    className={classes.title}
                    style={{
                      color: "crimson",
                      textShadow: "1px 1px honeydew",
                      fontWeight: "bolder",
                    }}
                    gutterBottom
                  >
                    {artwork.title}
                  </Typography>
                  <Typography
                    className={classes.pos}
                    style={{ fontWeight: "700" }}
                  >
                    Name: {artwork.artist_name}
                    <br />
                    Country: {artwork.country}
                    <br />
                    City: {artwork.city}
                  </Typography>
                  {(artwork.content_type === "text" ||
                    artwork.content_type === "image") && (
                    <Typography variant="body1" className="admin-card-story">
                      <ReactReadMoreReadLess
                        className="read-more-read-less"
                        charLimit={250}
                        readMoreText={"Read more ▼"}
                        readLessText={"Read less ▲"}
                      >
                        {artwork.content_text}
                      </ReactReadMoreReadLess>
                    </Typography>
                  )}
                  <Typography variant="body1">
                    <strong>Status: </strong>
                    {artwork.artwork_status}
                  </Typography>
                  <Link
                    to={{
                      pathname: "/edit",
                      state: {
                        artwork: artwork,
                      },
                    }}
                  >
                    <Button color="primary" className="about">
                      Edit
                    </Button>
                  </Link>
                  {artwork.artwork_status !== "approved" && (
                    <>
                      <Button
                        color="primary"
                        className="about"
                        onClick={() => changeStatus(artwork.id, "approved")}
                      >
                        Accept
                      </Button>
                      <Button
                        color="primary"
                        className="about"
                        onClick={() => changeStatus(artwork.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    color="primary"
                    className="about delete-button"
                    onClick={() => deleteArtwork(artwork.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        {submittedArtwork.length === 0 && <div>No artwork to approve</div>}
      </div>
    </>
  );
};

export default AdminStoryCards;
