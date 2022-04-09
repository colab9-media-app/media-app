import { async } from "@firebase/util";
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
  documentId,
  collection,
  addDoc,
  writeBatch,
  query,
  where,
  FieldPath,
  deleteDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHhKXDgUEwkQXiE1SpPrvyBJDs9uIwxmg",
  authDomain: "media-app-de265.firebaseapp.com",
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

export const auth = getAuth();
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

export const signUserOut = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback ); 

export const addMovieToWatchList = async (movie, userId) => {
const movieLocRef = collection(db, "users", userId, "watchlist")
const q = query(movieLocRef, where("movieId", "==", movie.id))
const queryResult = await getDocs(q).then((v)=> v.docs);
if(queryResult.length === 0 ){
  // await setDoc(db(movieLocRef, movie.id), {
  //   ...movie,
  //   movieId: movie.id
    
  // }
  // add a document 
  const newMovieRef = doc(movieLocRef, movie.id)
  await setDoc((newMovieRef), {
    ...movie,
    movieId: movie.id
  })
}
}


const deleteMovieFromWatchList = async (m, userId)=> {

  const ref = collection(db, "users", userId, "watchlist");
  await deleteDoc(db(ref, m.id))
  
}

export const getUserWatchList = async (userId) => {
  if(!userId) return;
  
  const watchListRef = collection(db, "watchlist");
  const watchListSnapshot = await getDocs(watchListRef);
  const watchList = watchListSnapshot.docs.map((doc) => doc.data());
  return watchList;
}

