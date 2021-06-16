import React, { useState } from "react";
const Upload = () => {
	const [uploadForm, setUploadForm] = useState({
		title: "",
		artist_name: "",
		townCity: "",
		country: "",
		story: "",
	});
	const handleChange = (e) => {
		setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("/upload", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(uploadForm),
		});
	};
	return (
		<div>
			<h2>Please use the form below to tell us your story...</h2>
			<form className="form" onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					value={uploadForm.title}
					onChange={handleChange}
					placeholder="Title"
				/>
				<br />
				<br />
				<input
					type="text"
					name="artist_name"
					value={uploadForm.artist_name}
					onChange={handleChange}
					placeholder="Full name"
				/>
				<br />
				<br />
				<input
					type="text"
					name="townCity"
					value={uploadForm.townCity}
					onChange={handleChange}
					placeholder="Town/City"
				/>
				<br />
				<br />
				<input
					type="text"
					name="country"
					value={uploadForm.country}
					onChange={handleChange}
					placeholder="Country"
				/>
				<br />
				<br />
				<p>Please tell us enter your story below:</p>
				<input
					type="text"
					name="story"
					value={uploadForm.story}
					onChange={handleChange}
					placeholder=""
				/>
				<br />
				<br />
				<button type="submit" className="btn">
          Submit
				</button>
			</form>
		</div>
	);
};
export default Upload;
