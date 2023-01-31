import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const sendToDetails = () => {
    navigate("/products/" + id);
  };
  return (
    <div onClick={sendToDetails} className="shop-products-item">
      <div className="shop-products-item-img-wrap">
        <img className="pimg-1" src={img[0]} alt="qoorchaq img" />
        <img className="pimg-2" src={img[1]} alt="qoorchaq img" />
      </div>
      <p>{name}</p>
      <p>{desc}</p>
      <p style={{ fontWeight: 700 }}>$ {price}</p>
      {sold && <span className="shop-products-sold">SOLD</span>}
    </div>
  );
}

export default Product;
