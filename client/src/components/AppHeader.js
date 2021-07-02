import React from "react";
import SelectCountry from "./SelectCountry";
import Switch from "./Switch";
import UploadModal from './UploadModal';
import UchiIntro from './UchiIntro';
import SearchBar from './SearchBar';
import logo from '../logo/uchi logo square jpeg.jpg';
import DonateLink from "./DonateLink";
import Sticky from "react-stickynode";

const AppHeader = ({ approvedArtwork, setApprovedArtwork, backupData }) => {
  return (
    <header className='app-header'>
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
            <img style={{ width: '70%', height: 'auto', marginTop: '-0.5em' }} src={logo} alt={logo} />
            <h1 className='brand-name'>UCHI</h1>
          </div>
          <div className="search-select">
            <SearchBar setApprovedArtwork={setApprovedArtwork} backupData={backupData} />
            <SelectCountry />
          </div>
          <div className="grid-empty-space"></div>
          <Switch approvedArtwork={approvedArtwork} setApprovedArtwork={setApprovedArtwork} backupData={backupData} />
        </div>
      </div>
      <UploadModal />
      <UchiIntro />
      <Sticky innerZ='10' enabled={true}>
        <DonateLink />
      </Sticky>
    </header>
  );
};

export default AppHeader;