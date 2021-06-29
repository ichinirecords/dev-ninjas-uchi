import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import CopyrightIcon from '@material-ui/icons/Copyright';

const Footer = () => {
  return (
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
          backgroundImage: "linear-gradient(#a8546c, #a8546c)",
          transform: "skewY(-6deg)",
          transformOrigin: "bottom right",
        }}
      >
        <div className='footer-content' style={{
          height: '200px',
          marginBottom: '100px'
        }}>
          <div className='admin-link'>
            <Link href="#" to='/login' style={{
              color: 'white',
              fontWeight: 'normal',
              fontFamily: 'Righteous',
            }}>
              Admin
            </Link>
          </div>
          <div className='copy-right'>
            Copyright
            <CopyrightIcon />
            DevNinjas
          </div>
        </div>
      </div>
    </footer>
  );

};

export default Footer;