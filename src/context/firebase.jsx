import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  query,
  where
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDhr4Z0paLE0D8v0yzuDzBEUQcyUYfh2AU",
  authDomain: "bookify-f86d1.firebaseapp.com",
  projectId: "bookify-f86d1",
  storageBucket: "bookify-f86d1.appspot.com",
  messagingSenderId: "158138673567",
  appId: "1:158138673567:web:0f7fbec78eef19e683f5aa",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    if (!user) {
      throw new Error("User must be logged in to create a listing.");
    }

    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);

    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user?.uid,
      userEmail: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, 'books'))
  }

  const getBookById = async(id) => {
    const docRef = doc(firestore, 'books', id);
    const result = await getDoc(docRef);
    return result;
  }

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path))
  }

  const placeOrder = async(bookId,qty) => {
    const collectionRef = collection(firestore,'books', bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      qty: Number(qty),
    });
    return result;
  };

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId ));
    const result = await getDocs(q);
    return result;
  }

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, 'books', bookId, 'orders');
    const result = await getDocs(collectionRef);
    return result;
  }

  const isLoggedIn = user ? true : false;

  const signinWithGitHub = () => {
    return signInWithPopup(firebaseAuth, githubProvider);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        signinWithGitHub,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
