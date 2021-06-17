import db from "./db";

const validUpdateFields = [
  "artist_name",
  "title",
  "current_location",
  "city",
  "country",
  "lat",
  "lon",
  "content_text",
  "content_link",
  "artwork_status",
  "decision_date",
  "admin_id",
];

const filterValidUpdateFields = (newFields) => {
  let validFields = {};
  console.log(newFields)
  for (let i in newFields) {
    if (
      i === "artwork_status" &&
      (newFields[i] === "submitted" ||
        newFields[i] === "approved" ||
        newFields[i] === "rejected")
    ) {
      validFields[i] = newFields[i];
    } else if (
      newFields[i] !== null &&
      String(newFields[i]).trim() != "" &&
      validUpdateFields.includes(i)
    ) {
      validFields[i] = newFields[i];
    }
  }
  return validFields;
};

const createUpdateQuery = (validFields) => {
  let query = "UPDATE artwork SET ";
  let counter = 1;
  let queryArray = [];
  for (let i in validFields) {
    query += ` ${i}=$${counter},`;
    counter++;
    queryArray.push(validFields[i]);
  }
  query = query.slice(0, -1);
  query += ` WHERE id=$${counter}`;
  return [query, queryArray];
};

export const updateArtwork = (req, res) => {
  const artworkId = req.params.id;
  const newFields = req.body;
  const validFields = filterValidUpdateFields(newFields);
  if (Object.keys(validFields).length === 0)
    return res.status(400).json({ error: "No valid fields submitted" });
  const [updateQuery, validFieldsArray] = createUpdateQuery(validFields);
  const queryArray = validFieldsArray.concat(artworkId);
  db.query(updateQuery, queryArray)
    .then((result) =>
      res.json({ success: `Artwork ${artworkId} updated successfully` })
    )
    .catch((e) => console.error(e));
};

export const getArtwork = (req, res) => {
  const status = req.query.status;
  let getQuery = `SELECT * FROM artwork`;
  if (Object.keys(req.query).length > 0) getQuery += " WHERE ";
  if (status) getQuery += `artwork_status = '${status}'`;
  db.query(getQuery)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
};
