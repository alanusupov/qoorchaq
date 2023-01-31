import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Custom from "./pages/Custom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import { store } from "./store/store";
import HeaderLayout from "./components/HeaderLayout";
import Checkout from "./pages/Checkout";
import PaymentCompletion from "./pages/PaymentCompletion";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import { auth } from ".";
import { useAppSelector } from "./store/hooks";
function App(): JSX.Element {
  const { user } = useAppSelector(state => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      dispatch(setUser({ user: currentUser }));
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<HeaderLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/customize" element={<Custom />} />
            <Route path="/shop/:id" element={<ShopCategory />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/completion" element={<PaymentCompletion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
