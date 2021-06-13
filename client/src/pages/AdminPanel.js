import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AdminPanel = ({user, setUser}) => {

	let history = useHistory();

	useEffect(()=>{ 
		console.log(user)
		fetch('/api/ping')
		.then(res => {
			if (res.status === 401) {
				setUser("")
			} else {
				return res.json()
			}
		})
		.then(data => setUser(data))
	},[]);

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
      {!user && (
        <div>User not logged in</div>
      )}
      {user && user.username && (
        <>
          <div className="about-and-login">
            <Button onClick={handleLogout} color="primary">
              Logout
            </Button>
          </div>
          <div>Welcome, {user.username}</div>
        </>
      )}
    </>
  );
};

export default AdminPanel;
