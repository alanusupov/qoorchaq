import { db } from "./../index";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  where,
  setDoc,
} from "firebase/firestore";

export interface IProduct {
  id: string;
  category?: string;
  type?: string;
  img: string[];
  name: string;
  desc: string;
  price: number;
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  sold: boolean;
  tags?: string[];
}

export const createDoc = async () => {
  await setDoc(doc(db, "products", "asdfsdf"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  });
};

export const getProductsApi = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products: IProduct[] = [];
    querySnapshot.forEach(doc => {
      products.push({
        id: doc.id,
        img: doc.data().img,
        name: doc.data().name,
        price: doc.data().price,
        size: doc.data().size,
        sold: doc.data().sold,
        category: doc.data().category,
        type: doc.data().type,
        desc: doc.data().desc,
        tags: doc.data().tags,
      });
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
    return products;
  } catch (error) {
    return [];
  }
};

export const getProductApi = async (id: string) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const productObj: IProduct = {
        id: docSnap.id,
        img: docSnap.data().img,
        name: docSnap.data().name,
        price: docSnap.data().price,
        size: docSnap.data().size,
        sold: docSnap.data().sold,
        category: docSnap.data().category,
        type: docSnap.data().type,
        desc: docSnap.data().desc,
        tags: docSnap.data().tags,
      };
      return productObj;
      //return docSnap.data() as IProduct
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getCategoryProductsApi = async (category: string) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );
  try {
    const querySnapshot = await getDocs(q);
    const products: IProduct[] = [];
    querySnapshot.forEach(doc => {
      products.push({
        id: doc.id,
        img: doc.data().img,
        name: doc.data().name,
        price: doc.data().price,
        size: doc.data().size,
        sold: doc.data().sold,
        category: doc.data().category,
        type: doc.data().type,
        desc: doc.data().desc,
      });
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
    return products;
  } catch (error) {
    return [];
  }
};
