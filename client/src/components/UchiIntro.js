import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import LoremIpsum from 'react-lorem-ipsum';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'black',
    width: '100%',
    position: 'relative',
    borderBottom: 'solid darkRed',
    borderBottomWidth: 'thick',
    display: 'grid',
    placeItems: 'center',
    color: 'antiqueWhite'
  },
  Toolbar: {
    display: 'grid',
    gridTemplateColumns: '1fr 5fr 0.6fr',
    gap: '2em',
    height: '17em',
    margin: '2em auto'
  },
  title: {
    display: 'grid',
    placeItems: 'center',
    margin: 'auto',
    fontSize: '5em',
    color: 'antiqueWhite',
    fontFamily: 'Righteous',
    marginLeft: theme.spacing(2),
  },
  Typography: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    fontFamily: 'Righteous',
    fontSize: '1em',
    borderStyle: 'solid',
    borderColor: 'antiqueWhite',
    borderRadius: '1.5em',
    display: 'grid',
    placeItems: 'center',
    margin: 'auto',
    borderWidth: 'thick',
    height: '95%'
  },
  Button: {
    whiteSpace: 'nowrap',
    backgroundColor: 'darkRed',
    fontFamily: 'Righteous',
    color: 'antiqueWhite',
    '&:hover': {
      backgroundColor: 'crimson',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UchiIntro = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.Toolbar}>
            <h1 className={classes.title}>UCHI</h1>
            <Typography className={classes.Typography}>
              <div className='lorem'>
                <LoremIpsum style={{ borderColor: 'white' }} p={2} avgSentencesPerParagraph={6} random={false} />
              </div>
            </Typography>
            <Button variant='contained' className={classes.Button} onClick={handleClose}>
              Main Site
            </Button>
          </Toolbar>
        </AppBar>
        <List className={classes.body}>
          <ListItem>
            <img src='https://cdn.pixabay.com/photo/2014/03/25/16/34/world-map-297446_1280.png' alt='world map' style={{
              width: '100%',
              height: '70vh',
            }}></img>
          </ListItem>
          <ListItem>
            <Typography className={classes.Typography} style={{ margin: '0 2em 0 2em', borderStyle: 'none' }}>
              <LoremIpsum p={5} />
            </Typography>
          </ListItem>
          <ListItem>
          <div className='footer-outer-div'>
              <div className='center'>
                <Button className={classes.Button} variant='contained' onClick={handleClose}>
                  Main Site
                </Button>
              </div>
          </div>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default UchiIntro;