import { useEffect, useState } from "react";
import Sticky from "react-stickynode";
import "./Home.css";
import ArtistsStoryCards from "../components/ArtistsStoryCards";
import AppHeader from "../components/AppHeader";
import DonateLink from "../components/DonateLink";
import Footer from "../components/Footer";
import Map from "../components/Map";
import HomeTab from "../components/HomeTab";

export function Home() {
  const [approvedArtwork, setApprovedArtwork] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const [view, setView] = useState("listing")
  
  useEffect(() => {
    fetch("/api/artwork?status=approved")
      .then((res) => res.json())
      .then((data) => {
        setApprovedArtwork(data);
        setBackupData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Sticky enabled={true}>
        <DonateLink />
      </Sticky>
      <main className="main" role="main">
        <AppHeader approvedArtwork={approvedArtwork} setApprovedArtwork={setApprovedArtwork} backupData={backupData}/>
        <HomeTab setView={setView} />
        {view === "listing" && <ArtistsStoryCards approvedArtwork={approvedArtwork} />}
        {view === "map" && <Map approvedArtwork={approvedArtwork} /> }
      </main>
      <Footer />
    </>
  );
}

export default Home;
