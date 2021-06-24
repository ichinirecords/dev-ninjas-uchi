import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import './ArtistsStoryCards.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#bfacf0'
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 3,
  },
});

const ArtistsStoryCards = ({ approvedArtwork }) => {
  const classes = useStyles();

  return (
    <div className='container'>
      <div className='cards-wrapper'>
        {approvedArtwork.map((artwork) => {
          return (
            <Card key={artwork.id} className={classes.root}>
              <CardContent>
                {artwork.type === 'image' && (
                  <CardMedia
                    className='card-img'
                    component='img'
                    alt='drawing colors'
                    height='240'
                    image='https://cdn.pixabay.com/photo/2020/06/17/12/40/artistic-5309339_960_720.jpg'
                    title='drawing colors'
                  />
                )}
                <Typography
                  variant='h3'
                  className={classes.title}
                  style={{
                    color: 'crimson',
                    textShadow: '1px 1px honeydew',
                    fontWeight: 'bolder',
                  }}
                  gutterBottom
                >
                  {artwork.title}
                </Typography>
                <Typography
                  className={classes.pos}
                  style={{ fontWeight: '700' }}
                >
                  Name: {artwork.artist_name}
                  <br />
                  Country: {artwork.country}
                  <br />
                  City: {artwork.city}
                </Typography>
                <Typography variant='body1'>
                  <ReactReadMoreReadLess
                    className='read-more-read-less'
                    charLimit={250}
                    readMoreText={'Read more ▼'}
                    readLessText={'Read less ▲'}
                  >
                    {artwork.content_text}
                  </ReactReadMoreReadLess>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistsStoryCards;
