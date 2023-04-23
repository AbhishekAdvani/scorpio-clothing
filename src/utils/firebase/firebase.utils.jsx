import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz61SpQnXj9govjQEjuWDvLMvnHwEe54k",
  authDomain: "scorpio-clothing.firebaseapp.com",
  projectId: "scorpio-clothing",
  storageBucket: "scorpio-clothing.appspot.com",
  messagingSenderId: "265069396690",
  appId: "1:265069396690:web:19ef50afce2f5c95dca30b",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
