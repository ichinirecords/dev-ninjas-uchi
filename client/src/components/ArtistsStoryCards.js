import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ReactReadMoreReadLess from "react-read-more-read-less";
import './ArtistsStoryCards.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minHeight: '500px',
    backgroundColor: '#878694',
    margin: '0 5%'
  },
  title: {
    fontSize: 22,
    fontFamily: 'EB Garamond',
  },
  image: {
    width: '100%',
    height: '280px',
  },
  video: {
    width: '100%',
    height: '280px'
  },
  pos: {
    marginBottom: '0.75em',
    fontFamily: 'EB Garamond',
    fontSize: 18
  },
  text: {
    fontFamily: 'Garamond',
    fontSize: 18,
    minHeight: '60px'
  }
});

const ArtistsStoryCards = ({ approvedArtwork }) => {
  const classes = useStyles();

  return (
    <div className='container'>
      <div className='cards-wrapper'>
        {approvedArtwork.map((artwork, index) => {
          return (
            <Card key={artwork.id} className={classes.root}>
              <CardActionArea className='card-action'>
                {artwork.content_type === 'image' && (
                  <CardMedia
                    className={`${classes.image} card-img`}
                    component='img'
                    alt={artwork.title}
                    height='240'
                    image={artwork.content_link}
                    title={artwork.title}
                  />
                )}
                {artwork.content_type === "video" && (
                  <video className={classes.video} width="100%" height="240" controls>
                    <source src={artwork.content_link} type="video/mp4" />
                  </video>
                )}
                {/* {artwork.content_type === 'audio' && (
                  <CardMedia
                    className={classes.audio}
                    component='audio'
                    height='280'
                    image={artwork.content_link}
                    title={artwork.title}
                  />
                )} */}
                {artwork.content_type === "audio" && (
                  <audio controls style={{ display: "flex", width: "100%", height: '280px' }}>
                    <source src={artwork.content_link} />
                  </audio>
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {artwork.title}
                  </Typography>
                  <Typography className={classes.pos} variant="body2" component="p">
                    Name: {artwork.artist_name}
                    <br />
                    Country: {artwork.country}
                    <br />
                    City: {artwork.city}
                  </Typography>
                  <Typography className={classes.text} variant="body1" component='p'>
                    {artwork.content_type !== 'text' && (<ReactReadMoreReadLess
                      className='read-more-read-less'
                      id={index}
                      charLimit={50}
                      readMoreText={'Read more ▼'}
                      readLessText={'Read less ▲'}
                    >
                      {artwork.content_text}
                    </ReactReadMoreReadLess>)}
                    {artwork.content_type === 'text' && (<ReactReadMoreReadLess
                      className='read-more-read-less'
                      id={index}
                      charLimit={550}
                      readMoreText={'Read more ▼'}
                      readLessText={'Read less ▲'}
                    >
                      {artwork.content_text}
                    </ReactReadMoreReadLess>)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </div>
    </div>
  );
}

export default ArtistsStoryCards;
