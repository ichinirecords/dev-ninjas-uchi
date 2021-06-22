import React from "react";
import SelectCountry from "./SelectCountry";
import Switch from "./Switch";
// import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
import UploadModal from './UploadModal';

const AppHeader = () => {
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
          <div className="page-title">
            <h1>UCHI</h1>
          </div>
          <div className="search-select">
            <div key="input-form" className="search-input-wrapper">
              <i className="fas fa-search"></i>
              <input
                key="search-input "
                type="text"
                className="search-bar"
                placeholder="Search ..."
              // value={searchInput}
              // onChange={handleSearchInput}
              />
            </div>
            <div><SelectCountry /></div>
            
          </div>
          <div className="grid-empty-space"></div>
          <Switch />
        </div>
      </div>
      {/* <Button component={Link} to="/upload" variant='contained' className='upload-btn' style={{
        backgroundColor: '#A4237F', 
        color: 'white',
        fontWeight: 'normal', 
        border: '5px solid #7D69AF', 
        boxSizing: 'border-box',
        borderRadius: '5px', 
        fontFamily: 'Righteous', 
        padding: '0.2em 1.75em'
      }}>
        Upload
      </Button> */}
      <UploadModal />
    </header>
  );

};

export default AppHeader;