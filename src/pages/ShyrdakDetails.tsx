import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductApi, IProduct } from "../api/shopApi";
import Header from "../components/Header";
import SimpleImageSlider from "react-simple-image-slider";
import Footer from "../components/Footer";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";
import Spinner from "../components/items/Spinner";
import CustomDetailsForm from "../components/items/CustomDetailsForm";
import { getNestedDoc } from "../api/firebaseFuncs";

interface IShyrdak {
  id: string;
  type: string;
  name: string;
  desc: string;
  price: number;
  img: string[];
  tags: string[];
  sold: boolean;
}

function ShyrdakDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<IShyrdak | null>(null);
  const { cartItems } = useAppSelector(state => state.cart);
  const dispatch = useDispatch();
  console.log(product);

  useEffect(() => {
    let flag = false;
    const getProduct = async () => {
      const productDetail = await getNestedDoc(
        "products",
        "shyrdaks",
        "items",
        id as string
      );
      if (productDetail) {
        setProduct(productDetail as IShyrdak);
      }
    };
    if (!flag) {
      getProduct();
    }

    return () => {
      flag = true;
    };
  }, [id]);
  // console.log(product);

  const imgs = useMemo(() => {
    return product?.img.map(item => {
      return {
        url: item,
      };
    });
  }, [product]);

  const addItem = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };
  const removeItem = () => {
    dispatch(removeFromCart(id as string));
  };
  // console.log(cartItems);

  return (
    <div className="productDetails">
      {/* <div className="productDetails-body"></div> */}

      {product ? (
        <div className="productDetails-body">
          {imgs && (
            <div className="productDetails-slider">
              <SimpleImageSlider
                width={300}
                height={375}
                images={imgs}
                showBullets={true}
                showNavs={true}
              />
            </div>
          )}
          {imgs && (
            <div className="productDetails-info-imgs">
              {imgs.map(img => {
                return (
                  <Zoom key={img.url}>
                    <img
                      className="productDetails-info-img"
                      src={img.url}
                      alt="qoorchaq product image"
                    />
                  </Zoom>
                );
              })}
            </div>
          )}
          <div className="productDetails-info">
            <h3 className="productDetails-info-title">
              {product.name + " " + "SHYRDAK"}
            </h3>
            <h4 className="productDetails-info-price">${product.price} USD</h4>
            <hr className="productDetails-info-line" />
            {/* <p className="productDetails-info-size">
              Size: {product.size.toUpperCase()}
            </p> */}
            <p className="productDetails-info-text">{product.desc}</p>
            {product.tags && (
              <div className="productDetails-info-tags">
                {product.tags.map(tag => (
                  <div key={tag}>{tag}</div>
                ))}
              </div>
            )}
            {!product.sold ? (
              cartItems.some(item => item.id === id) ? (
                <button
                  onClick={removeItem}
                  className="productDetails-info-btn">
                  Remove from Cart
                </button>
              ) : (
                <button onClick={addItem} className="productDetails-info-btn">
                  Add to Cart
                </button>
              )
            ) : (
              <button disabled className="productDetails-sold">
                SOLD
              </button>
            )}
            <CustomDetailsForm text="Sold? Want a custom design? Customize your own Qoorchaq shyrdak now!" />
          </div>
        </div>
      ) : (
        <div className="productDetails-body">
          <Spinner />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ShyrdakDetails;
