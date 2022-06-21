import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore() // initilize database inside console 

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;
    // see if reference exist in document module
    // doc takes 3 params (database, colection, identyfier)
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    // if collection dosent exist then firebase will create that for us 

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot.exist()); // -> we can check if reference exist (could be useful cause if dosent exist then create new one);

    // check if user data exist
    //return userDocRef
    // else if user data dosent exist
    // create set document with data from user auth in my colection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error createing user', error)
        }
    } else {
        console.log('user data exist');
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // if those dosent exist there is no need to run this func czuase of lack of data

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; // if those dosent exist there is no need to run this func czuase of lack of data

    return await signInWithEmailAndPassword(auth, email, password);
}

