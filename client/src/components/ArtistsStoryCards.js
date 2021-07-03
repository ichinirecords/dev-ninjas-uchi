import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ReactReadMoreReadLess from "react-read-more-read-less";
import "./ArtistsStoryCards.css";

const useStyles = makeStyles({
	root: {
		width: "100%",
<<<<<<< HEAD
		minHeight: "500px",
=======
		height: "auto",
>>>>>>> 3d9b1f107ac8565598104ca93499a8d07611168f
		backgroundColor: "#878694",
		margin: "0 5%",
	},
	title: {
		fontSize: 22,
		fontFamily: "EB Garamond",
	},
	image: {
		width: "100%",
		height: "280px",
	},
	video: {
		width: "100%",
		height: "280px",
	},
	pos: {
		marginBottom: "0.75em",
		fontFamily: "EB Garamond",
		fontSize: 18,
	},
	text: {
		fontFamily: "Garamond",
		fontSize: 18,
		minHeight: "60px",
	},
});

const ArtistsStoryCards = ({ approvedArtwork }) => {
	const classes = useStyles();

	return (
		<div className='container'>
			<div className='cards-wrapper'>
				{approvedArtwork.map((artwork, index) => {
					return (
						<Card key={artwork.id} className={classes.root}>
<<<<<<< HEAD
							<CardActionArea className='card-action'>
								{artwork.content_type === "image" && (
									<CardMedia
										className={`${classes.image} card-img`}
										component='img'
										alt={artwork.title}
										height='240'
=======
							<CardActionArea className="card-action">
								{artwork.content_type === "image" && (
									<CardMedia
										className={`${classes.image} card-img`}
										component="img"
										alt={artwork.title}
										height="240"
>>>>>>> 3d9b1f107ac8565598104ca93499a8d07611168f
										image={artwork.content_link}
										title={artwork.title}
									/>
								)}
								{artwork.content_type === "video" && (
<<<<<<< HEAD
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
									<audio controls style={{ display: "flex", width: "100%", height: "280px" }}>
										<source src={artwork.content_link} />
									</audio>
=======
									<video
										className={classes.video}
										width="100%"
										height="240"
										controls
									>
										<source src={artwork.content_link} type="video/mp4" />
									</video>
								)}
								{artwork.content_type === "audio" && (
									<CardMedia
										className={classes.audio}
										component="audio"
										height="240"
										image={artwork.content_link}
										title={artwork.title}
									/>
>>>>>>> 3d9b1f107ac8565598104ca93499a8d07611168f
								)}
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{artwork.title}
									</Typography>
<<<<<<< HEAD
									<Typography className={classes.pos} variant="body2" component="p">
=======
									<Typography
										className={classes.pos}
										variant="body2"
										component="p"
									>
>>>>>>> 3d9b1f107ac8565598104ca93499a8d07611168f
                    Name: {artwork.artist_name}
										<br />
                    Country: {artwork.country}
										<br />
                    City: &nbsp;
										{artwork.city === "undefined"
											? "No city provided"
											: artwork.city}
									</Typography>
<<<<<<< HEAD
									<Typography className={classes.text} variant="body1" component='p'>
										{artwork.content_type !== "text" && (<ReactReadMoreReadLess
											className='read-more-read-less'
=======
									<Typography
										className={classes.text}
										variant="body1"
										component="p"
									>
										<ReactReadMoreReadLess
											className="read-more-read-less"
>>>>>>> 3d9b1f107ac8565598104ca93499a8d07611168f
											id={index}
											charLimit={50}
											readMoreText={"Read more ▼"}
											readLessText={"Read less ▲"}
										>
											{artwork.content_text}
<<<<<<< HEAD
										</ReactReadMoreReadLess>)}
										{artwork.content_type === "text" && (<ReactReadMoreReadLess
											className='read-more-read-less'
											id={index}
											charLimit={550}
											readMoreText={"Read more ▼"}
											readLessText={"Read less ▲"}
										>
											{artwork.content_text}
										</ReactReadMoreReadLess>)}
=======
										</ReactReadMoreReadLess>
>>>>>>> 3d9b1f107ac8565598104ca93499a8d07611168f
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default ArtistsStoryCards;
