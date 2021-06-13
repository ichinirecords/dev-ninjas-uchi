import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link, useLocation, useHistory } from "react-router-dom";

const AdminPanel = () => {
	const location = useLocation();
	const [username, setUsername] = useState("");

	let history = useHistory();

	useEffect(()=>{ if (location.state && location.state.username){
		setUsername(location.state.username)
	}},[location]);

	const handleLogout = () => {
		fetch("/api/logout")
		.then(res => {
			if (res.status != 200) {
				alert("Could not log out");
			} else {
				history.push("/");
			}
		})
	}

	return (
    <>
      {username.length < 1 && <div>User not logged in</div>}
      {username.length > 0 && (
		<>
        <div className="about-and-login">
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button> 
        </div>
		<div>
			Welcome, {username}
		</div>
		</>
      )}
    </>
  );
};

export default AdminPanel;
