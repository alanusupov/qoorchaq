import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import icon from "../media/google-icon.svg";
function Login() {
  return (
    <div className="login">
      {/* <Header backg="black" /> */}
      <h4 className="login-title">Log in to Qoorchaq.</h4>
      <form className="login-form">
        <input
          required
          className="login-input"
          placeholder="E-mail"
          type="email"
        />
        <input
          required
          className="login-input"
          placeholder="Password"
          type="password"
        />
        <button className="login-btn">Login</button>
      </form>
      <div className="login-forgot">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
      <hr className="login-line" />
      <div className="login-bottom">
        <button className="login-google-btn">
          <img src={icon} alt="google icon" /> Login with Google
        </button>
        <Link to="/register" className="login-info">
          Need an account? Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
