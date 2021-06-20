import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Button } from "@material-ui/core";

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
});

const AdminStoryCards = ({ user, approveMode}) => {
  const classes = useStyles();

  const [submittedArtwork, setSubmittedArtwork] = useState([]);

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
    <div className="cards-wrapper">
      {submittedArtwork.length > 0 &&
        submittedArtwork.map((artwork, index) => {
          return (
            <Card key={artwork.id} className={classes.root}>
              <CardContent>
                {artwork.type === "image" && (
                  <CardMedia
                    className="card-img"
                    component="img"
                    alt="drawing colors"
                    height="240"
                    image="https://cdn.pixabay.com/photo/2020/06/17/12/40/artistic-5309339_960_720.jpg"
                    title="drawing colors"
                  />
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
                <Typography variant="body1">
                  <ReactReadMoreReadLess
                    className="read-more-read-less"
                    charLimit={250}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                  >
                    {artwork.content_text}
                  </ReactReadMoreReadLess>
                </Typography>
                <Link
                  to={{
                    pathname: "/edit",
                    state: {
                      artwork: artwork
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
                  className="about"
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
  );
};

export default AdminStoryCards;
