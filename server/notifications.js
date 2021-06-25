require("dotenv").config();
import cron from "node-cron";
import nodemailer from "nodemailer";

import db from "./db";

// Get all admin emails
export const getAdminEmails = async () => {
  let emailQuery = `SELECT email FROM admins;`;
  try {
    const queryResult = await db.query(emailQuery);
    const emails = await queryResult.rows;
    const validEmails = await emails
      .filter((el) => el.email)
      .map((el) => el.email)
      .join(", ");
    return validEmails;
  } catch {
    (error) => console.log(error);
  }
};

// Get all artwork with status submitted
const getSubmittedArtwork = async () => {
  try {
    const queryResult = await db.query(
      "SELECT * FROM artwork WHERE artwork_status='submitted'"
    );
    const submittedArtwork = await queryResult.rows;
    return submittedArtwork;
  } catch {
    (error) => console.log(error);
  }
};

// Create email text
const createEmailText = async () => {
  const artwork = await getSubmittedArtwork();
  let result = `<!DOCTYPE html>
    <html><header><h1>Here is the outstanding artwork to submit</h1></header>
	<body>`;
  if (artwork.length === 0) {
    result += "<div>No outstanding artwork to submit</div></body></html>";
  } else {
    result += `<table><thead><tr>
			<th>Artwork title</th>
			<th>Author name</th>
			<th>City</th>
			<th>Country</th>
			<th>Media type</th>
			<th>Submission date</th></tr></thead><tbody>`;
  }
  artwork.forEach((item) => {
    result += `<tr><td>${item.title}</td>
			<td>${item.artist_name}</td>
			<td>${item.city}</td>
			<td>${item.country}</td>
			<td>${item.content_type}</td>
			<td>${item.created_on}</td></tr>`;
  });
  if (artwork.length > 0) {
    result += `</tbody></table><div>Go to <a href="https://dev-ninjas-uchi.herokuapp.com/login">login</a> to approve new submissions</div></body></html>`;
  }
  return result;
};

const getMailOptions = async () => {
  const emails = await getAdminEmails();
  const htmlText = await createEmailText();
  return {
    from: process.env.EMAIL,
    to: emails,
    subject: "Uchi daily admin digest",
    text: "Testing content",
    html: htmlText,
  };
};

// Gmail settings for successful login: 2-factor auth off, allow less secure apps on
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email every day at 8am
//export const cronJob = cron.schedule("* * * * *", async () => {
export const cronJob = cron.schedule("0 8 * * *", async () => {
   if (process.env.MODE === "prod") {
    const mailOptions = await getMailOptions();
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
   }
});
