import db from "./db";

// TODO get all emails in admin
const getEmails = async () => {
  let emailQuery = `SELECT email FROM admins;`;
  try  {
	const emails = await db.query(emailQuery).rows;
	return emails.filter(el => el.length > 1).join(", ")
  } catch {
	  error => console.log(error)
  }
};

// TODO get all artwork with status submitted

// TODO create email text

export const getMailOptions = async () => {
const mailOptions = {
  from: process.env.EMAIL,
  to: "earwen1986@gmail.com, cecilia_baggini@hotmail.com",
  subject: "Uchi daily admin digest",
  text: "Some content to send",
};
}

export const mailOptions = {
  from: process.env.EMAIL,
  to: "earwen1986@gmail.com, cecilia_baggini@hotmail.com",
  subject: "Uchi daily admin digest",
  text: "Some content to send",
};
