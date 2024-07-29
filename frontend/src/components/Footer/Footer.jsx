import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Discover an exquisite culinary journey at our restaurant, where
            every dish is meticulously prepared using the freshest, premium
            ingredients.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-7894526165</li>
            <li>contact@foodkart.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright-text">
        Copyright 2024 &copy; Foodkart.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
