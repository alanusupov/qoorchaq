import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Custom() {
  const [form, setForm] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSend = () => {
    console.log("asd");
  };

  return (
    <div className="custom">
      <Header backg="black" />
      <h2 className="custom-title">Customize a Qoorchaq</h2>
      <div className="custom-info">
        <p className="custom-text">
          Continuing the traditions of our ancestors, we can make products that
          will be made specifically customized for you. Patterns will be applied
          to the fabric, consisting of your wishes. Luck, love, favorite number,
          initials, favorite emoji or pop culture hero - all this will become
          your personal legacy. In order to create one, fill out the form below
          to be contacted and start creating a unique handmade piece of art.
        </p>
      </div>
      <form className="custom-form">
        <input
          type="text"
          placeholder="Name"
          required
          className="custom-input"
          name="name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="custom-input"
          onChange={handleChange}
        />
        <input
          name="desc"
          type="text"
          placeholder="What would you like to customize?"
          className="custom-input"
          onChange={handleChange}
        />
        <button onSubmit={handleSend} className="custom-btn">
          Send
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Custom;
