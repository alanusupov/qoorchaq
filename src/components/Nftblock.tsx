import React from "react";
import nftskull from "../media/nftskullbig.png";

const Nftblock = () => {
  return (
    <div className="nftblock">
      <div className="nftblock-left">
        <div className="nftblock-left-top">22.02.2022</div>
        <h2 className="nftblock-left-title">OUR FIRST NFT!</h2>
        <p className="nftblock-left-text">
          TO celebrate the launch of our website, we are launching our first
          Skull NFT. It Will unlock secret benefits which you will discover upon
          purchase. We won’t tell you which, but You will not be disappointed.
        </p>
        <a href="#" className="nftblock-left-link">
          <button className="nftblock-left-btn">
            PURCHASE RAW PRIME SKULL NFT
          </button>
        </a>
        <div className="nftblock-left-bottom">
          AVAILABLE ON{" "}
          <a target="_blank" href="https://www.OPENSEA.IO">
            OPENSEA.IO
          </a>
        </div>
      </div>
      <div className="nftblock-right">
        <div className="nftblock-right-inner">
          <img src={nftskull} alt="nftskull" />
          <div className="nftblock-right-mini">THE RAW, PRIME SKULL</div>
        </div>
      </div>
    </div>
  );
};

export default Nftblock;
