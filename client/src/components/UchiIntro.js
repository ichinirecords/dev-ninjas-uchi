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
    height: '30vh',
    width: '100%',
    position: 'relative',
    borderBottom: 'solid crimson'
  },
  Toolbar: {
    display: 'grid',
    gridTemplateColumns: '1fr 5fr 0.5fr',
    gap: '2em'
  },
  title: {
    display: 'grid',
    placeItems: 'center',
    fontSize: '5em',
    fontFamily: 'Righteous',
    marginLeft: theme.spacing(2),
  },
  Typography: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    fontFamily: 'Righteous',
    fontSize: '1em',
  },
  Button: {
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: '1.5em',
    right: '1em',
    fontWeight: 'bold',
    fontSize: '1em',
    fontFamily: 'Righteous',
    color: 'inherit'
  }
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
            <h2 className={classes.title}>UCHI</h2>
            <Typography className={classes.Typography}>
              <LoremIpsum p={2} avgSentencesPerParagraph={6} random={false} />
            </Typography>
            <Button className={classes.Button} onClick={handleClose}>
              Main Site
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <img src='https://cdn.pixabay.com/photo/2014/03/25/16/34/world-map-297446_1280.png' alt='world map' style={{
              width: '100%',
              height: '70vh',
            }}></img>
          </ListItem>
          <ListItem>
            <Typography className={classes.Typography} style={{ margin: '0 2em 0 2em' }}>
              <LoremIpsum p={5} />
            </Typography>
          </ListItem>
          <ListItem>
           <div className='center'>
              <Button variant='contained' style={{ color: 'white', background: 'black', marginBottom: '2em', fontFamily: 'Righteous' }} onClick={handleClose}>
                Main Site
              </Button>
           </div>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default UchiIntro;