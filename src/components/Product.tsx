import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartImage from "./items/CartImage";

interface Props {
  name: string;
  id: string;
  img: string[];
  category: string;
  type: string;
  price: number;
  size: string;
  desc: string;
  sold: boolean;
}

function Product({
  name,
  id,
  img,
  category,
  type,
  price,
  size,
  desc,
  sold,
}: Props) {
  // const [hover, setHover] = useState<boolean>(false);
  const navigate = useNavigate();

  // console.log(window.location.pathname.split("/"), "vot");
  const path = window.location.pathname.split("/");
  const currentPath = path[path.length - 1];
  // console.log(currentPath, "path");
  const sendToDetails = () => {
    navigate(`/${currentPath}/${id}`);
    // if (currentPath === "shyrdaks") {
    //   navigate("/shyrdaks/" + id);
    // } else {

    //   navigate("/products/" + id);
    // }
  };
  return (
    <div onClick={sendToDetails} className="shop-products-item">
      <div className="shop-products-item-img-wrap">
        {img.length > 1 ? (
          <>
            <CartImage classname="pimg-1" src={img[0]} alt="qoorchaq img" />
            <CartImage classname="pimg-2" src={img[1]} alt="qoorchaq img" />
          </>
        ) : (
          <>
            <CartImage classname="simg-1" src={img[0]} alt="qoorchaq img" />
          </>
        )}
      </div>
      <p>{name}</p>
      {currentPath === "shyrdaks" ? <></> : <p>{desc}</p>}
      <p style={{ fontWeight: 700 }}>$ {price}</p>
      {/* {sold && <span className="shop-products-sold">SOLD</span>} */}
    </div>
  );
}

export default Product;
