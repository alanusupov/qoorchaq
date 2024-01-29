import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import navlogo from "../media/navlogo.svg";
import cart from "../media/cart.svg";
import ham from "../media/ham.svg";
import DropdownMenu from "./items/DropdownMenu";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeFromCart } from "../store/slices/cartSlice";
import { useAppSelector } from "../store/hooks";
import { logout } from "../services/auth";
import CartImage from "./items/CartImage";

interface Props {
  active?: string;
  backg?: string;
}

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const Header: React.FC<Props> = ({ backg, active }) => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [detailShop, setDetailShop] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

  const { cartItems } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.user);

  const dispatch = useDispatch();
  function useWindowSize(): Size {
    const [windowSize, setWindowSize] = useState<Size>({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      let prev_items = JSON.parse(localStorage.getItem("cart") as string) || [];
      dispatch(addItemsToCart(prev_items));
    }
  }, []);

  useEffect(() => {
    // if (isInitiallyFetched) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // }
  }, [cartItems]);

  const windSize = useWindowSize();

  const navigate = useNavigate();
  return (
    <header
      style={{
        background: backg ? backg : "transparent",
      }}
      className="header nav-fixed">
      <nav
        style={{
          backgroundColor:
            navOpen && windSize.width && windSize.width < 1020
              ? "#B91E24"
              : "transparent",
        }}
        className="nav">
        <div onClick={() => setNavOpen(!navOpen)} className="nav-ham">
          {navOpen ? (
            <span className="close-x">&#10005;</span>
          ) : (
            <img src={ham} alt="menu" />
          )}
        </div>
        <ul className="nav-list">
          <li
            onClick={() => setDetailShop(!detailShop)}
            className="nav-item nav-item-shop">
            Shop
            {detailShop && (
              <ul className="nav-item-shop-drop">
                <li>
                  <Link to="/shop/mens">Mens</Link>
                </li>
                <li>
                  <Link to="/shop/womens">Womens</Link>
                </li>
                <li>
                  <Link to="/shop/shyrdaks">Shyrdaks</Link>
                </li>
                {/* <li>
                  <Link to="/shop/unisex">Unisex</Link>
                </li>
                <li>
                  <Link to="/shop/accessories">Accessories</Link>
                </li>
                <li>
                  <Link to="/shop">All Products</Link>
                </li> */}
              </ul>
            )}
          </li>
          <li className="nav-item">
            <Link to="/story">Storytellings</Link>
          </li>

          {/* <li className="nav-item">
            <Link to="/journal">BLOG</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/customize">CUSTOM</Link>
          </li>
        </ul>
        <div className="nav-logo">
          <Link to="/">
            <img src={navlogo} alt="" />
          </Link>
        </div>
        <ul className="nav-list-right">
          <li className="nav-item-right">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item-right">
            <a href="https://www.opensea.io">
              <span>Secret Skull</span> NFT
            </a>
          </li>
          <li className="nav-item-right">
            {user ? (
              <></>
            ) : (
              // <Link to="/orders">Orders</Link>
              <Link to="/login">Login</Link>
            )}
          </li>
          <li
            onClick={() => setCartOpen(!cartOpen)}
            className="nav-item-right cartLogo">
            <img src={cart} alt="cart icon" />
            {cartItems.length > 0 && (
              <span className="cartLogo-length">{cartItems.length}</span>
            )}
          </li>
        </ul>
        <div
          onClick={() => setCartOpen(!cartOpen)}
          className="nav-cart cartLogo">
          {!navOpen && (
            <>
              <img src={cart} alt="cart icon" />
              {cartItems.length > 0 && (
                <span className="cartLogo-length">{cartItems.length}</span>
              )}
            </>
          )}
        </div>
      </nav>
      {!navOpen && cartOpen && (
        <div className="cart-dropdown">
          <div className="cart-dropdown-body">
            <div className="cart-dropdown-list">
              {cartItems
                ? cartItems.map(item => (
                    <div key={item.id} className="cart-dropdown-item">
                      <div
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="cart-dropdown-img-wrap">
                        <CartImage src={item.img[0]} alt={item.name} />
                        {/* <img src={item.img[0]} alt={item.name} /> */}
                      </div>
                      <div className="cart-dropdown-details">
                        <h5>{item.name + " " + item.type}</h5>
                        <h6>$ {item.price}</h6>
                      </div>
                      <div
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="cart-dropdown-close">
                        X
                      </div>
                    </div>
                  ))
                : "no items"}
            </div>
            <div className="cart-dropdown-total">
              Products Total:{" "}
              {cartItems.reduce((a, b) => {
                return a + b.price;
              }, 0)}{" "}
              $
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="cart-dropdown-btn">
              Checkout
            </button>
          </div>
        </div>
      )}
      {navOpen ? (
        <div className="nav-mobile">
          <DropdownMenu title="Womens" link="/shop/womens" />
          <DropdownMenu title="Mens" link="/shop/mens" />
          <DropdownMenu title="Shyrdaks" link="/shop/shyrdaks" />
          {/* <DropdownMenu title="Unisex" link="/shop/unisex" /> */}
          {/* <DropdownMenu title="Accessories" link="/shop/accessories" /> */}
          {/* <DropdownMenu title="All Products" link="/shop" /> */}
        </div>
      ) : null}
    </header>
  );
};

export default Header;
