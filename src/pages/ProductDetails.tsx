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

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { cartItems } = useAppSelector(state => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      const productDetail = await getProductApi(id as string);
      setProduct(productDetail);
    };
    getProduct();
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
  console.log(cartItems);

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
            <h3 className="productDetails-info-title">{product.name}</h3>
            <h4 className="productDetails-info-price">${product.price}</h4>
            <p className="productDetails-info-size">
              Size: {product.size.toUpperCase()}
            </p>
            <p className="productDetails-info-text">{product.desc}</p>

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

export default ProductDetails;
