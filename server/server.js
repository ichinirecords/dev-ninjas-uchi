import http from "http";

import app from "./app";
import { connectDb, disconnectDb } from "./db";

const port = parseInt(process.env.PORT || "3000");

const server = http.createServer(app);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	// eslint-disable-next-line no-console
	console.log(`Listening on ${bind}`);
});

// test start
require("dotenv").config();
import cron from "node-cron";
import nodemailer from "nodemailer";
import {mailOptions} from "./notifications";

// Gmail settings for successful login: 2-factor auth off, allow less secure apps on
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email every day at 8am
// TODO only have email sent from production server
cron.schedule("* * * * *", () => {
// cron.schedule("0 8 * * *", () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

// test end

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(port));
