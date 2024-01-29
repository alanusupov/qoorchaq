import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createDoc, getDocById, updateDocument } from "../api/firebaseFuncs";
import Header from "../components/Header";
import icon from "../media/google-icon.svg";
import { signIn, signInWithGoogle } from "../services/auth";
interface ILoginData {
  email: string;
  password: string;
}
function Login() {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    setError("");
    try {
      if ((loginData.email, loginData.password)) {
        await signIn(loginData.email, loginData.password);
      } else {
        setError("All fields must be filled in!");
      }
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
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
        // navigate("/pages-feed");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <button className="login-btn">Login</button>
      </form>
      <div className="login-forgot">
        {error && error}
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
      <hr className="login-line" />
      <div className="login-bottom">
        <button onClick={handleGoogleLogin} className="login-google-btn">
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
