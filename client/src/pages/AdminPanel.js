import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CopyrightIcon from "@material-ui/icons/Copyright";
import AdminStoryCards from "../components/AdminStoryCards";
import NewAdmin from "../components/NewAdmin";
import "./AdminPanel.css";

const AdminPanel = ({ user, setUser }) => {
  let history = useHistory();

  const [approveMode, setApproveMode] = useState(true);
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    fetch("/api/ping", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          history.push("/login");
        } else {
          return res.json();
        }
      })
      .then((data) => setUser(data));
  }, []);

  const handleLogout = () => {
    fetch("/api/logout").then((res) => {
      if (res.status != 200) {
        alert("Could not log out");
      } else {
        history.push("/");
      }
    });
  };

  return (
    <>
      <main className="main" role="main">
        {user && user.username && (
          <>
            <header>
              <div
                className="header_bg"
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  right: "0",
                  left: "0",
                  width: "100 %",
                  height: "100 %",
                  backgroundImage: "linear-gradient(white, white)",
                  transform: "skewY(-6deg)",
                  transformOrigin: "top left",
                }}
              >
                <div className="header-contents">
                  <div className="brand-name">
                    <h1>UCHI</h1>
                  </div>
                  <div className="grid-empty-space"></div>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="contained"
                className="upload-btn"
                style={{
                  backgroundColor: "#A4237F",
                  fontWeight: "normal",
                  border: "5px solid #7D69AF",
                  boxSizing: "border-box",
                  borderRadius: "5px",
                  fontFamily: "Righteous",
                  padding: "0.2em 1.75em",
                }}
              >
                Logout
              </Button>
            </header>
            <h1 id="welcome">Welcome, {user.username}</h1>
            <Button
              onClick={() => setCreateMode(!createMode)}
              variant="contained"
              style={{
                backgroundColor: "#A4237F",
                fontWeight: "normal",
                border: "5px solid #7D69AF",
                boxSizing: "border-box",
                borderRadius: "5px",
                fontFamily: "Righteous",
                padding: "0.2em 1.75em",
              }}
            >
              Create new admin
            </Button>
            {createMode && <NewAdmin setCreateMode={setCreateMode} />}
            <h2 className="admin-title">
              {approveMode ? "Artwork to approve" : "All artwork"}
            </h2>
            <Button
              onClick={() => setApproveMode(!approveMode)}
              variant="contained"
              className="upload-btn"
              style={{
                backgroundColor: "#A4237F",
                fontWeight: "normal",
                border: "5px solid #7D69AF",
                boxSizing: "border-box",
                borderRadius: "5px",
                fontFamily: "Righteous",
                padding: "0.2em 1.75em",
              }}
            >
              {approveMode ? "See all artwork" : "See only artwork to approve"}
            </Button>
            <AdminStoryCards user={user} approveMode={approveMode} />
          </>
        )}
      </main>
      <footer>
        <div
          className="footer_bg"
          style={{
            position: "relative",
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            width: "100 %",
            height: "100 %",
            backgroundImage: "linear-gradient(white, white)",
            transform: "skewY(-6deg)",
            transformOrigin: "bottom right",
          }}
        >
          <div
            className="footer-content"
            style={{
              height: "200px",
              marginBottom: "0",
            }}
          >
            <div className="copy-right">
              Copyright
              <CopyrightIcon />
              DevNinjas
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AdminPanel;
