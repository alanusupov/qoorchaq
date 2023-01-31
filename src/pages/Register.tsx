import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import icon from "../media/google-icon.svg";
function Login() {
  return (
    <div className="login">
      {/* <Header backg="black" /> */}
      <h4 className="login-title">Sign up to Qoorchaq.</h4>
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
        <button className="login-btn">Register</button>
      </form>
      <div className="login-forgot">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
      <hr className="login-line" />
      <div className="login-bottom">
        <button className="login-google-btn">
          <img src={icon} alt="google icon" />
          Signup with Google
        </button>
        <Link to="/login" className="login-info">
          Already a user? Login
        </Link>
      </div>
    </div>
  );
}

export default Login;
