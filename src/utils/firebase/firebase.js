import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_KEY,
  authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
  projectId: "media-app-de265",
  storageBucket: "media-app-de265.appspot.com",
  messagingSenderId: "976481831407",
  appId: "1:976481831407:web:bbc01658f420eda0480e1a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("there was an error", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const forgetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const signUserOut = (history) => {
  signOut(auth).then(() => {
    window.location.href = "/";
  });
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const addMovieToWatchList = async (movie, userId) => {
  const movieRef = doc(db, "users", `${userId}/watchlist/${movie.id}`);
  const movieSnapshot = await getDoc(movieRef);
  const movieToWatchedListSnapshot = await getDoc(
    doc(db, "users", `${userId}/watchedlist/${movie.id}`)
  );
  if (movieToWatchedListSnapshot.exists()) {
    // toast.error("Movie already in watched list");
    return;
  }
  if (!movieSnapshot.exists()) {
    await setDoc(movieRef, movie);
  }
};

export const addMovieToWatchedList = async (movie, userId) => {
  console.log(movie);
  const movieRef = doc(db, "users", `${userId}/watchedlist/${movie.id}`);
  const movieSnapshot = await getDoc(movieRef);
  const movieWatchListSnapshot = await getDoc(
    doc(db, "users", `${userId}/watchlist/${movie.id}`)
  );
  if (movieWatchListSnapshot.exists()) {
    // toast.error("Movie already in watchlist");
    return;
  }
  if (!movieSnapshot.exists()) {
    await setDoc(movieRef, movie);
  }
};

export const getUserWatchList = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const collectionRef = collection(userDocRef, "watchlist");
  return await getDocs(collectionRef).then((snapshot) =>
    snapshot.docs.map((doc) => doc.data())
  );
};

export const deleteMovieFromWatchList = async (movie, userId) => {
  const movieRef = doc(db, "users", `${userId}/watchlist/${movie.id}`);
  await deleteDoc(movieRef);
};

export const getUserWatchedList = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const collectionRef = collection(userDocRef, "watchedlist");
  return await getDocs(collectionRef).then((snapshot) =>
    snapshot.docs.map((doc) => doc.data())
  );
};

export const deleteMovieFromWatchedList = async (movie, userId) => {
  const movieRef = doc(db, "users", `${userId}/watchedlist/${movie.id}`);
  await deleteDoc(movieRef);
};

export const getUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("No user found"));
      }
    });
  });
};

export const saveSearchText = async (searchText, userId) => {
  const userHistoryRef = doc(db, "searchHistory", userId);
  const userHistorySnapshot = await getDoc(userHistoryRef);
  if (userHistorySnapshot.exists()) {
    await updateDoc(userHistoryRef, {
      searchTexts: [...userHistorySnapshot.data().searchTexts, searchText],
    });
  } else {
    await setDoc(userHistoryRef, { searchTexts: [searchText] });
  }
};

export const switchMovieToWatchedList = async (movie, userId) => {
  const movieRef = doc(db, "users", `${userId}/watchlist/${movie.id}`);
  const movieSnapshot = await getDoc(movieRef);
  const movieWatchedListSnapshot = await getDoc(
    doc(db, "users", `${userId}/watchedlist/${movie.id}`)
  );
  if (!movieWatchedListSnapshot.exists()) {
    await setDoc(doc(db, "users", `${userId}/watchedlist/${movie.id}`), movie);
    await deleteDoc(movieRef);
  }
    return;
  };

  export const switchMovieToWatchList = async (movie, userId) => {
    const movieRef = doc(db, "users", `${userId}/watchedlist/${movie.id}`);
    const movieSnapshot = await getDoc(movieRef);
    const movieWatchListSnapshot = await getDoc(
      doc(db, "users", `${userId}/watchlist/${movie.id}`)
    );
    if (!movieWatchListSnapshot.exists()) {
      await setDoc(doc(db, "users", `${userId}/watchlist/${movie.id}`), movie);
      await deleteDoc(movieRef);
    }
      return;
    }