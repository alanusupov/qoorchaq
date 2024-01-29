import { db } from "./../index";
import firebase from "firebase/app";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  where,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
// import uuid from "react-uuid";

//     } as IProject);
//   });
//   return projects;
// };
//creates document in firebase with given collection, if there is no ID, firebase will generate a unique ID
export const createDoc = async (
  data: any,
  collectionId: string,
  docId?: string | null
) => {
  if (docId) {
    await setDoc(doc(db, collectionId, docId), data);
  } else {
    await addDoc(collection(db, collectionId), data);
  }
};

//if doc exists, it will merge with the rest of the data
export const createDocMerge = async (
  data: Record<string, any>,
  collectionId: string,
  docId: string | null
) => {
  if (docId) {
    await setDoc(doc(db, collectionId, docId), data, { merge: true });
  } else {
    await addDoc(collection(db, collectionId), data);
  }
};

export const updateDocument = async (
  data: Record<string, any>,
  collectionId: string,
  documentId: string
) => {
  const docRef = doc(db, collectionId, documentId);
  try {
    await updateDoc(docRef, data);
  } catch (error) {
    console.log(error);
  }
};

export const getDocById = async (id: string, collectionId: string) => {
  const docRef = doc(db, collectionId, id);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDocByIdPromise = async (id: string, collectionId: string) => {
  const docRef = doc(db, collectionId, id);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      return docSnap;
    } else {
      console.log("Document doesnt exist");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

//add picture to storage
// export const sendPictureToFirestore = async (file: File) => {
//   const imgRef = ref(storage, `logos/${file.name + uuid()}`);
//   try {
//     console.log("works");

//     const res = await uploadBytes(imgRef, file);
//     console.log(res);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getCollectionByName = async (collectionId: string) => {
  const q = query(collection(db, collectionId));

  try {
    const querySnapshot = await getDocs(q);
    const queryData: any = [];
    querySnapshot.forEach(doc => {
      queryData.push({ ...doc.data(), id: doc.id });
    });
    return queryData;
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionByOrder = async (collectionId: string) => {
  const docRef = query(collection(db, collectionId), orderBy("createdAt"));
  const querySnapshot = await getDocs(docRef);
  const queryData: any = [];
  querySnapshot.forEach(doc => {
    queryData.push({ ...doc.data(), id: doc.id });
  });
  return queryData.reverse();
};

export const getSubCollection = async (
  collectionId: string,
  docId: string,
  subCollectionId: string
) => {
  const queryData: any[] = [];
  try {
    const docRef = doc(db, collectionId, docId);

    // Get a sub-collection named "my-subcollection" inside the document
    const subCollectionRef = collection(docRef, subCollectionId);

    await getDocs(subCollectionRef).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        queryData.push({ ...doc.data(), id: doc.id });
      });
    });
    console.log(queryData);

    return queryData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getNestedDoc = async (
  collectionId: string,
  collectionDoc: string,
  subCollectionId: string,
  docId: string
) => {
  const parentDocRef = doc(db, collectionId, collectionDoc);

  // Get a reference to the sub-collection
  const subCollectionRef = collection(parentDocRef, subCollectionId);

  // Get a reference to the desired document
  const docRef = doc(subCollectionRef, docId);

  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return { ...docSnapshot.data(), id: docId as string };
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

// export const sendVideoToFirestore = async (file: File) => {
//   const vidRef = ref(storage, `/videos/${file.name + uui()}`);
//   try {
//     console.log("works video");
//     const res = await uploadBytes(vidRef, file);
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteFirebaseImage = (url: string) => {
//   //1.
//   let pictureRef = ref(storage, url);
//   //2.
//   deleteObject(pictureRef).then(() => {
//     console.log("image was deleted");
//   });
// };
