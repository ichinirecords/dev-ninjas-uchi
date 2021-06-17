import db  from "./db";

const newQuery
  = "INSERT INTO artwork (title, artist_name, city, country, content_text, artwork_status, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7)";


export const artUpload = (req, res) => {
	const newArtTitle = req.body.title;
	const newArtName = req.body.name;
	const newArtCity = req.body.city;
	const newArtCountry = req.body.country;
	const newArtStory = req.body.story;
	db.query(newQuery, [
		newArtTitle,
		newArtName,
		newArtCity,
		newArtCountry,
		newArtStory,
		"submitted",
		new Date(),
	])
		.then(() => res.sendStatus(201));
};
