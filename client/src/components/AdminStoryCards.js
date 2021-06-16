import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import loremIpsum from "react-lorem-ipsum";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#b1b19c",
    height: "auto",
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 3,
  },
});

const AdminStoryCards = () => {
  const classes = useStyles();

  const [submittedArtwork, setSubmittedArtwork] = useState([]);

  useEffect(() => {
      fetch("/api/artwork?status=submitted")
        .then((res) => res.json())
        .then((data) => setSubmittedArtwork(data))
        .catch((err) => console.log(err));
  }, []);

  // function to accept/reject submitted artwork
  const changeStatus = (id, newStatus) => {
    fetch(`/api/artwork/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artwork_status: newStatus }),
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
          alert("Status updated successfully");
          fetch("/api/artwork?status=submitted")
            .then((res) => res.json())
            .then((data) => setSubmittedArtwork(data))
            .catch((err) => console.log(err));
        } else {
          alert("Could not change artwork status");
        }
      });
  };

  return (
    <div className="cards-wrapper">
      {submittedArtwork.length > 0 &&
        submittedArtwork.map((artwork, index) => {
          return (
            <Card key={index} className={classes.root}>
              <CardContent>
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
                  style={{ color: "midnightblue", fontWeight: "600" }}
                >
                  By: {artwork.artist_name}
                  <br />
                  Country: {artwork.country}
                  <br />
                  City: {artwork.city}
                </Typography>
                <Typography style={{ color: "midnightblue" }} variant="body1">
                  <ReactReadMoreReadLess
                    className="read-more-read-less"
                    charLimit={250}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                  >
                    {artwork.content_text}
                  </ReactReadMoreReadLess>
                </Typography>
                {true && (
                  <>
                    <Button color="primary" className="about">
                      Edit
                    </Button>
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
              </CardContent>
            </Card>
          );
        })}
      {submittedArtwork.length === 0 && (
        <div>No artwork to approve</div>
      )}
    </div>
  );
};

export default AdminStoryCards;
