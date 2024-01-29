import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createDoc, getDocById, updateDocument } from "../api/firebaseFuncs";
import Header from "../components/Header";
import icon from "../media/google-icon.svg";
import { signInWithGoogle } from "../services/auth";

interface IRegData {}

function Register() {
  const [regData, setRegData] = useState<IRegData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithGoogle();
      console.log(user);
      const userRes = await getDocById(user.email as string, "users");

      if (userRes) {
        await updateDocument(
          { email: user.email },
          "users",
          user.email as string
        );
      } else {
        await createDoc({ email: user.email }, "users", user.email);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          name="email"
          onChange={handleChange}
        />
        <input
          required
          className="login-input"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <button className="login-btn">Register</button>
      </form>
      <div className="login-forgot">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
      <hr className="login-line" />
      <div className="login-bottom">
        <button onClick={handleGoogleLogin} className="login-google-btn">
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

export default Register;
