import db  from "./db";

const newQuery
  = "INSERT INTO artwork (title, artist_name, city, country, content_text, artwork_status, created_on, lat, lon) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";


export const artUpload = (req, res) => {
	const newArtTitle = req.body.title;
	const newArtName = req.body.artist_name;
	const newArtCity = req.body.city;
	const newArtCountry = req.body.country;
	const newArtStory = req.body.story;
	const newLat = req.body.lat;
	const newLon = req.body.lon
	db.query(newQuery, [
		newArtTitle,
		newArtName,
		newArtCity,
		newArtCountry,
		newArtStory,
		"submitted",
		new Date(),
		newLat,
		newLon
	])
		.then(() => res.sendStatus(201));
};
