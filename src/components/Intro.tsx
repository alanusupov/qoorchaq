import React from "react";
import { Link } from "react-router-dom";
import Main from "../pages/Main";
import arrow from "../media/arrow.svg";

type Props = {};

const Intro = (props: Props) => {
  return (
    <div className="intro">
      <div className="container">
        <div className="intro-main">
          <h1 className="intro-title">
            LIMITED COLLECTION <br />
            <span> COMING SOON!</span>
          </h1>
          <div className="intro-btn-wrap">
            <Link className="intro-btn1" to="/">
              Preview Shop
            </Link>
            <Link className="intro-btn2" to="/">
              Our Story
            </Link>
          </div>
          <p className="intro-text">
            Collection exploring our heritage by bringing back forgotten crafts.
          </p>
          <div className="intro-arrow bounce">
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
