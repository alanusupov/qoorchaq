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
import { ProtectedRoute } from "./components/ProtectedRoute";
import { appRoute } from "./constants/app";
import ShyrdakDetails from "./pages/ShyrdakDetails";
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
          <Route
            element={
              <ProtectedRoute allowed={!!user} redirectTo={appRoute.Login} />
            }>
            <Route path={appRoute.Checkout} element={<Checkout />} />
            <Route path="/completion" element={<PaymentCompletion />} />
          </Route>
          <Route element={<HeaderLayout />}>
            <Route path={appRoute.About} element={<About />} />
            <Route path={appRoute.Shop} element={<Shop />} />
            <Route path={appRoute.Custom} element={<Custom />} />
            <Route path={appRoute.ShopCategory} element={<ShopCategory />} />
            <Route path={appRoute.WomensDetails} element={<ProductDetails />} />
            <Route path={appRoute.MensDetails} element={<ProductDetails />} />
            <Route
              path={appRoute.ShyrdakDetails}
              element={<ShyrdakDetails />}
            />
          </Route>
          <Route
            element={
              <ProtectedRoute allowed={!user} redirectTo={appRoute.Home} />
            }>
            <Route path={appRoute.Login} element={<Login />} />
            <Route path={appRoute.Register} element={<Register />} />
          </Route>

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
