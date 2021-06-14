import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import loremIpsum from 'react-lorem-ipsum';
import ReactReadMoreReadLess from "react-read-more-read-less";

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'rgb(228, 218, 250)',
    height: 'auto'
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 3,
  },
});

const ArtistsStoryCards = () => {
  const classes = useStyles();
  return (
    <div className="cards-wrapper">
      {loremIpsum({ p: 15 }).map((text, index) => {
        return (
          <Card key={index} className={classes.root}>
            <CardContent>
              <Typography variant='h3' className={classes.title} style={{ color: 'crimson', textShadow: '1px 1px honeydew', fontWeight: 'bolder' }} gutterBottom>
                Title of the Story
              </Typography>
              <Typography className={classes.pos} style={{ color: 'midnightblue', fontWeight: '600' }}>
                By: [Name of the artist]
                <br />
                Country:
                <br />
                City:
              </Typography>
              <Typography style={{ color: 'midnightblue' }} variant="body1">
                <ReactReadMoreReadLess className='read-more-read-less'
                  charLimit={250}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                >
                  {text.props.children}
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