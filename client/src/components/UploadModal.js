import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MapForm from './MapForm';
import { useHistory } from "react-router-dom";
import UploadModalAlerts from './UploadModalAlerts';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    height: '4em',
    backgroundColor: '#7d69af',
    fontFamily: 'Righteous'
  },
  title: {
    marginLeft: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Righteous'
  },
  form: {
    display: 'grid',
    width: 'auto',
    placeItems: 'center',
    margin: 'auto',
    fontFamily: 'Righteous'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const history = useHistory();
  const [uploadForm, setUploadForm] = useState({
    title: "",
    artist_name: "",
    story: "",
  });

  const [coordUploadForm, setCoordUploadForm] = useState({})
  const handleChange = (e) => {
    setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Object.values(uploadForm).every((key) => key.length > 1);
    if (validate) {
      fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...uploadForm, ...coordUploadForm }),
      }).then(() => {
        setSuccessAlert(true);
        setTimeout(function () { setOpen(false); }, 6000);
      });
      history.push("/");
    } else {
      setErrorAlert(true);
      setTimeout(function () { setErrorAlert(false); }, 6000);
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
        className='upload-btn' style={{
          backgroundColor: '#A4237F',
          color: 'white',
          fontWeight: 'normal',
          border: '5px solid #7D69AF',
          boxSizing: 'border-box',
          borderRadius: '5px',
          fontFamily: 'Righteous',
          padding: '0.2em 1.75em'
        }}
        variant="outlined" color="primary" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Please fill out the form below and choose the media type you want to upload
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>
        <UploadModalAlerts error={errorAlert} setError={setErrorAlert} success={successAlert} setSuccess={setSuccessAlert} />
        <List className={classes.form}>
          <ListItem >
            <TextField
              autoFocus
              margin="dense"
              label="Title of your art work"
              placeholder="Title of your art work"
              type="text"
              name='title'
              fullWidth
              variant='outlined'
              value={uploadForm.title}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem >
            <TextField
              margin="dense"
              label="Your name, full name or nickname"
              placeholder="Your name, full name or nickname"
              type="text"
              name='artist_name'
              fullWidth
              variant='outlined'
              value={uploadForm.artist_name}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            Please locate the name of your country or city on the map
          </ListItem>
          <ListItem>
            <MapForm setCoordUploadForm={setCoordUploadForm} />
          </ListItem>
          <ListItem>
            <div className='center'>
              <div className="radio-container">
                <input className="radio-input" id={`upload_video`} type="radio" name="media-type" />
                <label className="radio-label" htmlFor={`upload_video`}>
                  Video
                </label>
                <input className="radio-input" id={`upload_image`} type="radio" name="media-type" />
                <label className="radio-label" htmlFor={`upload_image`}>
                  Image
                </label>
                <input className="radio-input" id={`upload_music`} type="radio" name="media-type" />
                <label className="radio-label" htmlFor={`upload_music`}>
                  Music
                </label>
                <input className="radio-input" id={`upload_text`} type="radio" name="media-type" />
                <label className="radio-label" htmlFor={`upload_text`}>
                  Text
                </label>
              </div>
            </div>
          </ListItem>
          <ListItem>
            <TextField
              label="Please type your story here"
              placeholder="Please type your story here"
              multiline
              variant="outlined"
              type='text'
              name='story'
              fullWidth
              value={uploadForm.story}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Button type='cancel' autoFocus color="secondary" variant='contained' onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit' autoFocus color="primary" variant='contained' onClick={handleSubmit}>
              Submit
            </Button>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default UploadModal;