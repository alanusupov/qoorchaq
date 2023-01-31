import React from "react";
import Header from "../components/Header";
import DropdownMenu from "../components/items/DropdownMenu";
import Intro from "../components/Intro";
import Nftblock from "../components/Nftblock";
import Storyblock from "../components/Storyblock";
import Footer from "../components/Footer";
import { createDoc } from "../api/shopApi";

function Main(): JSX.Element {
  return (
    <div style={{ color: "white" }}>
      {/* <Button onClick={createDoc}>add</Button> */}
      <Header />
      <Intro />
      <Nftblock />
      <Storyblock />
      <Footer />
    </div>
  );
}

export default Main;
