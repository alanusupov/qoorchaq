import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryProductsApi, IProduct } from "../api/shopApi";
import {
  getCollectionByName,
  getDocById,
  getSubCollection,
} from "../api/firebaseFuncs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/items/Spinner";
import Product from "../components/Product";

type Props = {};

function ShopCategory({}: Props) {
  const { id } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getSpecificProducts = async () => {
    try {
      // if (id === "shyrdaks") {
      const data = await getSubCollection("products", id as string, "items");
      if (data) setProducts(data as IProduct[]);
      setLoading(false);
      // } else {
      //   const data = await getCategoryProductsApi(id as string);
      //   if (data.length > 0) setProducts(data);
      //   setLoading(false);
      // }
    } catch (error) {
      console.log(error);
      setProducts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    let flag = false;
    if (!flag) {
      getSpecificProducts();
    }
    return () => {
      flag = true;
    };
  }, [id]);
  return (
    <div className="shop-category">
      <Header backg="black" />
      <div className="shop-inner container">
        <h2 className="shop-category-title shop-title">Shop {id}</h2>
        <p className={id === "shyrdaks" ? "shop-text-shyrdaks" : "shop-text"}>
          {id === "shyrdaks"
            ? `The collection of felted carpets "Animal Shyrdaks" is dedicated to the extinct Turan tiger, which inhabited the territory of Central Asia and was called "zholbors," "julbars," "yulbars." In Turkic languages, "zhol," "jul," "yul" means "path." This name was given to the tiger because of its unique feature - it could cover up to a hundred kilometers in a day as a nomadic tiger. The tiger was distinguished by its large size and was revered by the local people. Its ability to camouflage, disappear and reappear unexpectedly gave it a reputation as a supernatural being.
In the 20th century, uncontrolled hunting and the cultivation of valleys in Central Asian rivers for agriculture deprived the tigers of their main food base - wild boars and roe deer. This led to the gradual disappearance of this unique tiger.
The limited collection serves as a reminder of the fragility of the environment and the beauty of the region's wildlife. The 5 designs of Shyrdaks are handcrafted by skilled craftswomen in the mountains of At-Bashi. By acquiring a Shyrdak, you contribute to the preservation of the wild nature of Central Asia.
`
            : ` Qoorchaq is based on an idea. This idea is in turn composed of several
concepts, beliefs, and a good portion of old fashioned fighting
spirit. The pursuit of doing the opposite was one of the main reasons
the brand got started, although not an end in itself. It was rather
the passion for tush kyiiz fabric that pointed the brand in that
direction. The raw, untreated fabric had at the time been falling into
oblivion, and it wasn't sought after by the public.`}
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
}

export default ShopCategory;
