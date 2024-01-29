import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutList from "../components/Checkout/CheckoutList";
import CheckoutOrderForm from "../components/Checkout/CheckoutOrderForm";
import Footer from "../components/Footer";
import logo from "../media/navlogo-black.svg";
import { useAppSelector } from "../store/hooks";
import { addItemsToCart } from "../store/slices/cartSlice";

type Props = {};

export interface IOrderForm {
  email: string;
  country: any;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  number: string;
  telegram: string;
}

function Checkout({}: Props) {
  const dispatch = useDispatch();
  const { cartItems } = useAppSelector(state => state.cart);
  useEffect(() => {
    if (cartItems.length === 0) {
      let prev_items = JSON.parse(localStorage.getItem("cart") as string) || [];
      dispatch(addItemsToCart(prev_items));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [orderForm, setOrderForm] = useState<IOrderForm>({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    number: "",
    telegram: "",
  });

  // const getShippingPrice = () => {
  //   switch (orderForm.country.label.toLowerCase()) {
  //     case "kyrgyzstan":
  //       return 0;
  //     case "kazakhstan":
  //       return 50;
  //     case "uzbekizstan":
  //       return 50;
  //     case "russia":
  //       return 50;

  //     // case 'd'
  //     //   break;

  //     default:
  //       return 0;
  //   }
  // };
  // console.log(orderForm.country, "mola");

  return (
    <div className="checkout">
      <div className="checkout-head">
        <Link to="/">
          <img src={logo} alt="qoorchaq logo" />
        </Link>
        <Link className="checkout-head-right" to="/shop">
          Continue shopping{" "}
          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
            />
          </svg>
        </Link>
      </div>
      <CheckoutList cartItems={cartItems} />
      <CheckoutOrderForm
        checkoutPrice={cartItems.reduce((a, b) => {
          return a + b.price;
        }, 0)}
        orderForm={orderForm}
        setOrderForm={setOrderForm}
      />
      <Footer />
    </div>
  );
}

export default Checkout;
