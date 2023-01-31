import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryProductsApi, IProduct } from "../api/shopApi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/items/Spinner";
import Product from "../components/Product";

type Props = {};

function ShopCategory({}: Props) {
  const { id } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const getSpecificProducts = async () => {
      const data = await getCategoryProductsApi(id as string);
      if (data.length > 0) setProducts(data);
      setLoading(false);
    };
    getSpecificProducts();
  }, [id]);
  return (
    <div className="shop-category">
      <Header backg="black" />
      <div className="shop-inner container">
        <h2 className="shop-category-title shop-title">Shop {id}</h2>
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
                category={product.category}
                type={product.type}
                price={product.price}
                sold={product.sold}
                size={product.size}
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
}

export default ShopCategory;
