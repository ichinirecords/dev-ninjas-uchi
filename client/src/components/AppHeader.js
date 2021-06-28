import React from "react";
import SelectCountry from "./SelectCountry";
import Switch from "./Switch";
import UploadModal from './UploadModal';
import UchiIntro from './UchiIntro';
import SearchBar from './SearchBar';

const AppHeader = ({ approvedArtwork, setApprovedArtwork, backupData }) => {
  return (
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
          <div className="title-container">
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
    </header>
  );
};

export default AppHeader;