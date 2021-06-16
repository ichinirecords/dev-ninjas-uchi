const { Pool } = require("pg");
import { connectDb } from "./db";

const pool = new Pool(connectDb);
const newQuery
  = "INSERT INTO artwork (title, artist_name, city, country, content_text) VALUES ($1, $2, $3, $4, $5)";

module.exports = {
	artUpload: (req, res) => {
		const newArtTitle = req.body.title;
		const newArtName = req.body.name;
		const newArtCity = req.body.city;
		const newArtCountry = req.body.country;
		const newArtStory = req.body.story;
		pool.query(newQuery, [
			newArtTitle,
			newArtName,
			newArtCity,
			newArtCountry,
			newArtStory,
		])
			.then(() => res.sendStatus(201));
	},
};