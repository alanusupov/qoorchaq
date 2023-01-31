import React from "react";
import wall from "../media/wallbottom.jpg";
import orn from "../media/ornament.png";
const Storyblock = () => {
  return (
    <div className="story">
      <div className="story-info">
        <h2 className="story-title">
          FROM MOTHER TO DAUGHTER. CRAFT IS NO LONGER DEAD.
        </h2>
        <div className="story-mid">
          <img src={orn} alt="" />
          <p>
            Saving the dying technique of Tush Kiiz through fashion and craft.
            Explore the origins of the Tush Kiiz and its meaning.
          </p>
        </div>
        <button className="story-btn">OUR STORY</button>
      </div>
    </div>
  );
};

export default Storyblock;
