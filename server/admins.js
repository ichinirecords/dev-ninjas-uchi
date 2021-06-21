require("dotenv").config();
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import { getAdminEmails } from "./notifications";
import db from "./db";

export const login = (req, res) => {
  const { user } = req;
  res.json(user);
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    res.sendStatus(200);
  });
};

export const ping = (req, res) => {
  const { user } = req;
  res.send(user);
};

const getUserDetails = async (field, type) => {
  let detailsQuery = `SELECT * FROM admins WHERE ${type}=$1;`;
  try {
    const queryResult = await db.query(detailsQuery, [field]);
    const details = await queryResult.rows;
    const result = await details[0];
    return result;
  } catch {
    (error) => console.log(error);
  }
};

export const requestReset = async (req, res) => {
  const email = req.body.email;
  const adminEmails = await getAdminEmails();
  if (adminEmails.includes(email)) {
    const userDetails = await getUserDetails(email, "email");
    const salt = bcrypt.genSaltSync();
    const token = userDetails.email + userDetails.pass + String(new Date());
    const hash = bcrypt.hashSync(token, salt);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Uchi password reset link",
      html: `Someone requested a password reset for this Uchi account. If it wasn't you, no need to do anything. If you required a password reset, 
				go to <a href="https://dev-ninjas-uchi.herokuapp.com/api/reset?id=${userDetails.id}&token=${hash}">
				https://dev-ninjas-uchi.herokuapp.com/api/reset?id=${userDetails.id}&token=${hash}</a> to reset your email. This link will only be valid for today.`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  res.send("request processed");
};

export const resetPassword = async (req, res) => {
  const id = req.query.id;
  const token = req.query.token;
  const userDetails = await getUserDetails(id, "id");
  const newToken = userDetails.email + userDetails.pass + String(new Date());
  bcrypt.compare(newToken, token, (err, result) => {
    // res == true or res == false
	if (err) return res.status(500).send("could not complete password reset")
	if (result) {
		return res.send("Correct info")
		// Redirect to reset form, which requires login. Attach req.user to request?
	}
	return res.status(401).send("Incorrect info")
  });
};
