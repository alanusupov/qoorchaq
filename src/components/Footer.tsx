import React from "react";
import userIcon from "../media/user.svg";
import ig from "../media/insta.svg";
import twi from "../media/twit.svg";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
const Footer = () => {
  const { user } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };
  return (
    <footer className="footer">
      <div className="footer-wrap container">
        <div className="footer-btnwrap">
          <p className="footer-btntext">
            <img src={userIcon} alt="user icon" />
            <span>C/O QOORCHAQ</span>
          </p>
          <button onClick={handleClick} className="footer-btn">
            {user ? "LOGOUT" : "JOIN / SIGN IN"}
          </button>
          <hr className="footer-line" />
        </div>
        <div className="footer-info">
          <div className="footer-info-block">
            <p className="footer-info-title">THE PAGE</p>
            <p className="footer-info-text">Comics</p>
            <p className="footer-info-text">NFT</p>
            <p className="footer-info-text">Photoshoots</p>
            <p className="footer-info-text">Contact Us</p>
          </div>
          <div className="footer-info-block">
            <p className="footer-info-title">QOORCHAQ</p>
            <p className="footer-info-text">Shop Unisex</p>
            <p className="footer-info-text">Shop Women</p>
            <p className="footer-info-text">Shop Men</p>
            <p className="footer-info-text">Accessories</p>
            {/* <p className="footer-info-text">Read More</p> */}
          </div>
        </div>

        <div className="footer-social">
          <span>Social networks</span>
          <img src={ig} alt="instagram" />
          <img src={twi} alt="twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
