<<<<<<< HEAD
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import loremIpsum from "react-lorem-ipsum";
=======
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import loremIpsum from 'react-lorem-ipsum';
>>>>>>> Created educational and header components
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
<<<<<<< HEAD
    width: "100%",
    backgroundColor: "#b1b19c",
    height: "auto",
=======
    width: '100%',
    backgroundColor: '#b1b19c',
    height: 'auto'
>>>>>>> Created educational and header components
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 3,
  },
});

const ArtistsStoryCards = ({ isAdmin }) => {
  const classes = useStyles();

  return (
    <div className="cards-wrapper">
      {loremIpsum({ p: 15 }).map((text, index) => {
        return (
          <Card key={index} className={classes.root}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="240"
              image="https://cdn.pixabay.com/photo/2020/06/17/12/40/artistic-5309339_960_720.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="240"
                image="https://cdn.pixabay.com/photo/2020/06/17/12/40/artistic-5309339_960_720.jpg"
                title="Contemplative Reptile"
              />
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
                Title of the Story
              </Typography>
              <Typography
                className={classes.pos}
                style={{ color: "midnightblue", fontWeight: "600" }}
              >
                By: [Name of the artist]
                <br />
                Country:
                <br />
                City:
              </Typography>
              <Typography style={{ color: "midnightblue" }} variant="body1">
                <ReactReadMoreReadLess
                  className="read-more-read-less"
                  charLimit={250}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                >
                  {text.props.children}
                </ReactReadMoreReadLess>
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ArtistsStoryCards;
