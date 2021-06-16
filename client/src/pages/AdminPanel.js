import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArtistsStoryCards from "../components/ArtistsStoryCards";
import MapForm from "../components/MapForm";


const AdminPanel = ({user, setUser}) => {

	let history = useHistory();

	useEffect(()=>{ 
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
      {!user && <div>User not logged in</div>}
      {user && user.username && (
        <>
          <div className="about-and-login">
            <Button onClick={handleLogout} color="primary">
              Logout
            </Button>
          </div>
          <div id="welcome">Welcome, {user.username}</div>
          <h2>Artwork to approve</h2>
          <ArtistsStoryCards isAdmin={true}/>
        </>
      )}
	  {/* Just testing, to remove in the future */}
	  <MapForm />
    </>
  );
};

export default AdminPanel;
