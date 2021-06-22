import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const NewAdmin = ({ setCreateMode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      } else {
        alert("Account creation was not successful");
      }
    });
  };
  return (
    <form>
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
  );
};

export default NewAdmin;
