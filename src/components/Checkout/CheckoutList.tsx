import React from "react";
import { useDispatch } from "react-redux";
import { IProduct } from "../../api/shopApi";
import { removeFromCart } from "../../store/slices/cartSlice";

type Props = {
  cartItems: IProduct[];
};

function CheckoutList({ cartItems }: Props) {
  const dispatch = useDispatch();
  return (
    <div className="checkout-list">
      {cartItems.length > 0 &&
        cartItems.map(item => (
          <div key={item.id} className="checkout-list-item">
            <img src={item.img[0]} alt={item.name} />
            <div className="checkout-list-item-details">
              <h5>{item.name + " " + item.type}</h5>
              <h6>Size: {item.size}</h6>
            </div>
            <div className="checkout-list-item-price">{item.price} $</div>
            <div
              onClick={() => dispatch(removeFromCart(item.id))}
              className="checkout-list-item-close">
              X
            </div>
          </div>
        ))}
      <div className="checkout-total">
        <div className="checkout-total-item">
          <div className="checkout-total-left">Subtotal</div>
          <div className="checkout-total-right">
            {cartItems.reduce((a, b) => {
              return a + b.price;
            }, 0)}{" "}
            USD
          </div>
        </div>
        <div className="checkout-total-item">
          <div className="checkout-total-left">Shipping</div>
          <div className="checkout-total-right">Free</div>
        </div>
      </div>
      <div className="checkout-total-grand">
        <div>Grand Total</div>
        <div>
          {cartItems.reduce((a, b) => {
            return a + b.price;
          }, 0)}{" "}
          USD
        </div>
      </div>
    </div>
  );
}

export default CheckoutList;
