import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  src: string;
  alt: string;
  classname?: string;
};

function CartImage({ src, alt, classname }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}>
      {!loaded && <ClipLoader color="#000000" />}
      <img
        className={classname}
        style={{ display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
        src={src}
        alt={alt}
      />
    </div>
  );
}

export default CartImage;
