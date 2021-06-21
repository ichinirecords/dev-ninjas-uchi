require("dotenv").config();
import { getAdminEmails } from "./notifications";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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

const getUserDetails = async (email) => {
  let detailsQuery = `SELECT * FROM admins WHERE email=$1;`;
  try {
    const queryResult = await db.query(detailsQuery, [email]);
    const details = await queryResult.rows;
    return details[0];
  } catch {
    (error) => console.log(error);
  }
};

export const requestReset = async (req, res) => {
  const email = req.body.email;
  const adminEmails = await getAdminEmails();
  if (adminEmails.includes(email)) {
    const userDetails = getUserDetails(email);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(email + userDetails.pass + new Date(), salt);
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
