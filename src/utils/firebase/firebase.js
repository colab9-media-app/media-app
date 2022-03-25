import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, getDocs, setDoc, collection, writeBatch, query,} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHhKXDgUEwkQXiE1SpPrvyBJDs9uIwxmg",
    authDomain: "media-app-de265.firebaseapp.com",
    projectId: "media-app-de265",
    storageBucket: "media-app-de265.appspot.com",
    messagingSenderId: "976481831407",
    appId: "1:976481831407:web:bbc01658f420eda0480e1a"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "user", userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists())


    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log("there was an error", error.message);
        }
    }
    

  } 
