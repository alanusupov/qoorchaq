import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsApi, IProduct } from "../api/shopApi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/items/Spinner";
import Product from "../components/Product";

type Props = {};

const Shop = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    let flag = false;
    const loadProducts = async () => {
      const data = await getProductsApi();
      if (data.length > 0) setProducts(data);
      setLoading(false);
    };
    if (!flag) {
      loadProducts();
    }
    return () => {
      flag = true;
    };
  }, []);
  return (
    <div className="shop">
      <Header backg="black" />
      <div className="shop-inner container">
        <h2 className="shop-title">Shop All Products</h2>
        <p className="shop-text">
          Qoorchaq is based on an idea. This idea is in turn composed of several
          concepts, beliefs, and a good portion of old fashioned fighting
          spirit. The pursuit of doing the opposite was one of the main reasons
          the brand got started, although not an end in itself. It was rather
          the passion for tush kyiiz fabric that pointed the brand in that
          direction. The raw, untreated fabric had at the time been falling into
          oblivion, and it wasn't sought after by the public.
        </p>
        {loading && <Spinner />}
        <div className="shop-products-list">
          {products.length > 0 ? (
            products.map(product => (
              <Product
                key={product.id}
                name={product.name}
                id={product.id}
                desc={product.desc}
                img={product.img}
                category={product.category as string}
                type={product.type as string}
                price={product.price}
                sold={product.sold}
                size={product.size as string}
              />
            ))
          ) : (
            <div>{!loading && "No products yet"}</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
