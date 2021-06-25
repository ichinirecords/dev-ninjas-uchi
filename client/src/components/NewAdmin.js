import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "50%",
    minWidth: "300px",
    marginTop: theme.spacing(1),
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "1rem",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const NewAdmin = ({ setCreateMode }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length > 0 && email.length > 0) {
      fetch(`/api/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, email: email }),
      }).then((res) => {
        if (res.status === 200) {
          alert("New account created successfully");
          setCreateMode(false);
		} else if (res.status === 400) {
			alert("an user with this email address already exists")
        } else {
          alert("Account creation was not successful");
        }
      });
    } else {
      alert("Please fill in both fields");
    }
  };
  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="User name"
          name="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          id="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Create new admin account
        </Button>
      </form>
    </div>
  );
};

export default NewAdmin;
