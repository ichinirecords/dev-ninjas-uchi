import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import MapForm from "./MapForm";
import { useHistory } from "react-router-dom";
import UploadModalAlerts from "./UploadModalAlerts";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
		backgroundColor: "#7d69af",
		fontFamily: "Righteous",
	},
	title: {
		marginLeft: theme.spacing(5),
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "Righteous",
	},
	icon: {
		marginRight: '-1em'
	},
	form: {
		display: "grid",
		width: "50%",
		margin: "auto",
		fontFamily: "Righteous",
		backgroundColor: "#878694",
	},
	map_header: {
		fontSize: "1.25em",
	},
	media: {
		borderRadius: "0.25em",
		margin: "auto",
		border: "1px solid #999",
		fontFamily: "Righteous",
		fontSize: "1.8rem",
		width: "100%",
	},
	file_input_wrapper: {
		width: "100%",
		margin: "auto",
	},
	story: {
		margin: "2em auto 0 auto"
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UploadModal = () => {
	const classes = useStyles();
	const history = useHistory();
	const [file, setFile] = useState("");
	const [open, setOpen] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const [successAlert, setSuccessAlert] = useState(false);
	const [coordUploadForm, setCoordUploadForm] = useState({
		lat: "",
	});
	const [uploadingMessage, setUploadingMessage] = useState(false);

	const initialFormValues = {
		title: "",
		artist_name: "",
		content_type: "",
		story: "",
	};
	const [uploadForm, setUploadForm] = useState(initialFormValues);

	const validateForm = () =>{
		if (uploadForm.content_type === "") {
			return false;
		}
		if((uploadForm.content_type === "text"
			|| uploadForm.content_type === "image")
			&& Object.values(uploadForm).some((key) => key === "")) {
			return false;
		}
		if(uploadForm.content_type !== "text" && file === ""){
			return false;
		}
		if (
			(uploadForm.content_type === "audio"
        || uploadForm.content_type === "video")
      && (uploadForm.artist_name === ""
        || uploadForm.title === "")
		) {
			return false;
		}
		if(coordUploadForm.lat === ""){
			return false;
		}
		return true;
	};

	const handleMediaUpload = (e) =>{
		setFile(e.target.files[0]);
	};
	const handleChange = (e) => {
		setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
	};

	const handleTypeChange = (e) => {
		setUploadForm({ ...uploadForm, content_type: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validate = validateForm();
		if (validate) {
			const formData = new FormData();
			formData.append("image", file);
			console.log(file);
			for (let value of formData.values()) {
				console.log(value);
			}
			for(let key in uploadForm){
				formData.append(key, uploadForm[key]);
			}
			for (let key in coordUploadForm) {
				formData.append(key, coordUploadForm[key]);
			}
			for (let value of formData.values()) {
				console.log(value);
			}
			setUploadingMessage(true);
			fetch("/api/upload", {
				method: "POST",
				body: formData,
			}).then(() => {
				setUploadingMessage(false);
				setSuccessAlert(true);
				setUploadForm(initialFormValues);
				setFile("");
				setCoordUploadForm({ lat: "" });
				setTimeout(function () {
					setOpen(false);
					setSuccessAlert(false);
				}, 3000);
			});
			history.push("/");
		} else {
			setErrorAlert(true);
			setTimeout(function () {
				setErrorAlert(false);
			}, 3000);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				className="upload-btn"
				id="upload-button"
				style={{
					backgroundColor: "#1c555c",
					backgroundColor: '#563c96',
					backgroundColor: '#4f3e7f',
					color: "white",
					fontWeight: '900',
					// fontSize: '1em',
					fontWeight: "normal",
					border: "3px solid #a8546c",
					// boxSizing: "border-box",
					borderRadius: "7px",
					fontFamily: "EB Garamond",
					padding: "0.5em 1.75em",
				}}
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
        Upload
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
              Please fill out the form below and choose the media type you want
              to upload
						</Typography>
						<IconButton
						  className={classes.icon}
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List className={`${classes.form} upload-modal`}>
					<ListItem>
						<TextField
							autoFocus
							margin="dense"
							label="Title of your art work"
							placeholder="Title of your art work"
							type="text"
							name="title"
							fullWidth
							variant="outlined"
							value={uploadForm.title}
							onChange={handleChange}
						/>
					</ListItem>
					<ListItem>
						<TextField
							margin="dense"
							label="Your name, full name or nickname"
							placeholder="Your name, full name or nickname"
							type="text"
							name="artist_name"
							fullWidth
							variant="outlined"
							value={uploadForm.artist_name}
							onChange={handleChange}
						/>
					</ListItem>
					<ListItem className={classes.map_header}>
            Please enter the name of your country or city and locate it on the
            map
					</ListItem>
					<ListItem>
						<MapForm setCoordUploadForm={setCoordUploadForm} />
					</ListItem>
					<ListItem>
						<div className="center">
							<div className="radio-container">
								<input
									className="radio-input"
									id={"upload_video"}
									type="radio"
									name="media-type"
									value="video"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_video"}>
                  Video
								</label>
								<input
									className="radio-input"
									id={"upload_audio"}
									type="radio"
									name="media-type"
									value="audio"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_audio"}>
                  Audio
								</label>
								<input
									className="radio-input"
									id={"upload_image"}
									type="radio"
									name="media-type"
									value="image"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_image"}>
                  Image
								</label>
								<input
									className="radio-input"
									id={"upload_text"}
									type="radio"
									name="media-type"
									value="text"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_text"}>
                  Text
								</label>
							</div>
						</div>
					</ListItem>
					<ListItem>
						<UploadModalAlerts
							className={classes.alert}
							uploadingMessage={uploadingMessage}
							setUploadingMessage={setUploadingMessage}
						/>
					</ListItem>
					{uploadForm.content_type !== "text"
            && uploadForm.content_type !== "" && (
						<ListItem>
							<div className={classes.file_input_wrapper}>
								<input
									className={`${classes.media} media-input`}
									type="file"
									name="media"
									onChange={handleMediaUpload}
								/>
							</div>
						</ListItem>
					)}
					<ListItem className={classes.story}>
						<TextField
							label="Please type your story here"
							placeholder="Please type your story here"
							multiline
							variant="outlined"
							type="text"
							name="story"
							fullWidth
							value={uploadForm.story}
							onChange={handleChange}
						/>
					</ListItem>
					<ListItem>
						<UploadModalAlerts
							className={classes.alert}
							error={errorAlert}
							setError={setErrorAlert}
							success={successAlert}
							setSuccess={setSuccessAlert}
						/>
					</ListItem>
					<ListItem
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Button
							style={{
								margin: "2em",
								fontFamily: "Righteous",
							}}
							type="cancel"
							color="secondary"
							variant="outlined"
							onClick={handleClose}
						>
              Cancel
						</Button>
						<Button
							style={{
								margin: "2em",
								fontFamily: "Righteous",
							}}
							type="submit"
							color="primary"
							variant="outlined"
							onClick={handleSubmit}
						>
              Submit
						</Button>
					</ListItem>
					<ListItem>
						<p>
							{" "}
              If you require additional information or help, feel free to visit
							<a href="https://refaid.com/" target="_blank" rel="noreferrer">
								{" "}
                Refaid.com!
							</a>
						</p>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

export default UploadModal;