const { uploadFile } = require("./s3_upload");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

export const mediaUpload = async (req, res) => {
	const file = req.file;
	console.log(file);
	const result = await uploadFile(file);
	await unlinkFile(file.path);
	console.log(result);
	const description = req.body.story;
	console.log(description);
	res.send({ message: "Hello from backend" });
};
