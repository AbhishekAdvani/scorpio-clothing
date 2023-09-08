import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz61SpQnXj9govjQEjuWDvLMvnHwEe54k",
  authDomain: "scorpio-clothing.firebaseapp.com",
  projectId: "scorpio-clothing",
  storageBucket: "scorpio-clothing.appspot.com",
  messagingSenderId: "265069396690",
  appId: "1:265069396690:web:19ef50afce2f5c95dca30b",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// <!---- collection add ---->
export const addCollectionsAndDdocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  //
  objectsToAdd?.forEach((object) => {
    const docRef = doc(collectionRef, object?.title?.toLowerCase());
    batch?.set(docRef, object);
  });
  await batch?.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  // collection ref
  const collectionRef = collection(db, "categories");
  // run query
  const q = query(collectionRef);
  // get snapshot
  const querySnapshot = await getDocs(q);
  // map snapshot
  const categoryMap = querySnapshot?.docs?.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot?.data();
    acc[title?.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

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
      console.log("error creating the user", error.message);
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

export const signOutUser = async () => await signOut(auth);

// <!-- sign in/ sign out listener function for context to be updated -->
export const onAuthStateChangedListener = async (callback) =>
  await onAuthStateChanged(auth, callback);
