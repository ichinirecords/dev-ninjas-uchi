
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { loremIpsum, name, surname, fullname, username } from 'react-lorem-ipsum'

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

const ArtistsStoryCards = ({ isAdmin }) => {
  const classes = useStyles();

  return (
    <div className="cards-wrapper">
      {loremIpsum({ p: 15 }).map((text, index) => {
        console.log(name)
        return (
          <Card key={index} className={classes.root}>
            <CardContent>
              <CardMedia
                className='card-img'
                component="img"
                alt="drawing colors"
                height="240"
                image="https://cdn.pixabay.com/photo/2020/06/17/12/40/artistic-5309339_960_720.jpg"
                title="drawing colors"
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
              <Typography className={classes.pos} style={{ fontWeight: '700' }}>
                Name: {fullname()}
                <br />
                Country: {username()}
                <br />
                City: {surname()}
              </Typography>
              <Typography variant="body1">
                <ReactReadMoreReadLess
                  className="read-more-read-less"
                  charLimit={250}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                >
                  {text}
                </ReactReadMoreReadLess>
              </Typography>
            </CardContent>
          </Card>

        )
      })}
    </div>
    
  );
};

export default ArtistsStoryCards;
