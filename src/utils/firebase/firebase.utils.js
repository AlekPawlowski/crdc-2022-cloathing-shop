import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";


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