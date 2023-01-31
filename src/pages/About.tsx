import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import aboutimg from "../media/about.jpeg";
// type Props = {}

const About: React.FC = () => {
  return (
    <div className="about">
      <Header backg="black" />
      <h2 className="about-title">About Qoorchaq</h2>
      <div className="about-info">
        <p className="about-text">
          QOORCHAQ was founded by Jibek Abikova with the goal of introducing the
          world to ancient craft techniques by the women of Kyrgyz Republic,
          increasing awareness around ethical production processes and
          encouraging sustainable consumption in the fashion world. Handcrafted
          in Kyrgyz Republic, QOORCHAQ creates art to maintain the legacy of
          kyrgyz culture, moving it into the future with timeless style.
        </p>
        <p className="about-text">
          The essence of QOORCHAQ philosophy is enshrined in these three main
          pillars: rebirth of craftsmanship, ethical and sustainable values and
          a high-quality one of one handcrafted products.
        </p>
        <p className="about-text">
          Each design is unique and tells a different story through symbols,
          color and shape. QOORHAQ is connected to every stage of the design and
          production process with the spirit and soul of artisanal skills.
        </p>
        <p className="about-text">
          We dedicate our way to the artisans, who are the bearers of the
          traditional culture, holders of the ancient knowledge and skills,
          mentors for the new generation of the creators of the Beauty in
          Harmony and Nature.
        </p>
      </div>
      <img className="about-img" src={aboutimg} />
      <Footer />
    </div>
  );
};

export default About;
