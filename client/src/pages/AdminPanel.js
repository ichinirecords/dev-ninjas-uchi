import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CopyrightIcon from "@material-ui/icons/Copyright";
import AdminStoryCards from "../components/AdminStoryCards";
import NewAdmin from "../components/NewAdmin";
import "./AdminPanel.css";
import logo from "../logo/uchi logo square jpeg.jpg";

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
            <header className="app-header">
              <div
                className="header_bg"
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  right: "0",
                  left: "0",
                  width: "100 %",
                  height: "13em",
                  backgroundImage: "linear-gradient(#a8546c, #a8546c)",
                  transform: "skewY(-4deg)",
                  transformOrigin: "top left",
                }}
              >
                <div className="header-contents">
                  <div className="title-container">
                    <img
                      style={{
                        width: "70%",
                        height: "auto",
                        marginTop: "-0.5em",
                      }}
                      src={logo}
                      alt={logo}
                    />
                    <h1 className="brand-name">UCHI</h1>
                  </div>
                  <div className="grid-empty-space"></div>
                </div>
              </div>
              <Button
                className="upload-btn"
                style={{
                  backgroundColor: "#1c555c",
                  color: "antiquewhite",
                  fontWeight: "normal",
                  border: "5px solid #7d69af",
                  boxSizing: "border-box",
                  borderRadius: "7px",
                  fontFamily: "EB Garamond",
                  padding: "0.5em 1.75em",
                }}
                variant="outlined"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </header>
            <h1 id="welcome">Welcome, {user.username}</h1>
            <Button
              onClick={() => setCreateMode(!createMode)}
              className="upload-btn"
              style={{
                backgroundColor: "#1c555c",
                color: "antiquewhite",
                fontWeight: "normal",
                border: "5px solid #7d69af",
                boxSizing: "border-box",
                borderRadius: "7px",
                fontFamily: "EB Garamond",
                padding: "0.5em 1.75em",
              }}
              variant="outlined"
              color="primary"
            >
              Create new admin
            </Button>
            {createMode && <NewAdmin setCreateMode={setCreateMode} />}
            <h2 className="admin-title">
              {approveMode ? "Artwork to approve" : "All artwork"}
            </h2>
            <Button
              onClick={() => setApproveMode(!approveMode)}
              className="upload-btn"
              style={{
                backgroundColor: "#1c555c",
                color: "antiquewhite",
                fontWeight: "normal",
                border: "5px solid #7d69af",
                boxSizing: "border-box",
                borderRadius: "7px",
                fontFamily: "EB Garamond",
                padding: "0.5em 1.75em",
              }}
              variant="outlined"
              color="primary"
            >
              {approveMode ? "See all artwork" : "See only artwork to approve"}
            </Button>
            <AdminStoryCards user={user} approveMode={approveMode} />

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
                  height: "13em",
                  backgroundImage: "linear-gradient(#a8546c, #a8546c)",
                  transform: "skewY(-4deg)",
                  transformOrigin: "bottom right",
                }}
              >
                <div className="footer-content">
                  <div className="copy-right">
                    Copyright
                    <CopyrightIcon />
                    DevNinjas
                  </div>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>
    </>
  );
};

export default AdminPanel;
