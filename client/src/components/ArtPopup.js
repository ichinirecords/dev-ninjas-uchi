import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactReadMoreReadLess from "react-read-more-read-less";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#bfacf0",
    height: "auto",
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 3,
  },
});

const ArtPopup = ({
  id,
  title,
  type,
  artist_name,
  content_text,
  city,
  country,
}) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.root}>
      <CardContent>
        {type === "image" && (
          <CardMedia
            className="card-img"
            component="img"
            alt="drawing colors"
            height="240"
            image="https://cdn.pixabay.com/photo/2020/06/17/12/40/artistic-5309339_960_720.jpg"
            title="drawing colors"
          />
        )}
        <Typography
          variant="h3"
          className={classes.title}
          style={{
            color: "white",
            fontWeight: "bolder",
          }}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography className={classes.pos} style={{ fontWeight: "700" }}>
          Name: {artist_name}
          <br />
          Country: {country}
          <br />
          City: {city}
        </Typography>
        <Typography variant="body1">
          <ReactReadMoreReadLess
            className="read-more-read-less"
            charLimit={250}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
          >
            {content_text}
          </ReactReadMoreReadLess>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArtPopup;
