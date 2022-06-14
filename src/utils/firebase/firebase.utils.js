import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import { 
    getFirestore, // initilize firestroe
    doc, //doc
    getDoc, // acces data
    setDoc // seting document data
 } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDn8vSZ32zRLNGZm_9XkRkmFg8acGjHc5I",
    authDomain: "crwn-clothing-db-ac62a.firebaseapp.com",
    projectId: "crwn-clothing-db-ac62a",
    storageBucket: "crwn-clothing-db-ac62a.appspot.com",
    messagingSenderId: "218448381006",
    appId: "1:218448381006:web:54a64bb5a90f2ebdc1ef1f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
        prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore() // initilize database inside console 

export const createUserDocumentFromAuth = async (userAuth) =>{
    // see if reference exist in document module
    // doc takes 3 params (database, colection, identyfier)
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    // if collection dosent exist then firebase will create that for us 

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot.exist()); // -> we can check if reference exist (could be useful cause if dosent exist then create new one);
    

}