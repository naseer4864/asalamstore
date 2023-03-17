import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,
   createUserWithEmailAndPassword, signInWithRedirect,
    signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getFirestore, setDoc, collection,writeBatch,query,getDocs } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyC_XPvFF_etyJbSUa1sq1Rv0wB9OX-1t7k",
  authDomain: "as-salam-store-db.firebaseapp.com",
  projectId: "as-salam-store-db",
  storageBucket: "as-salam-store-db.appspot.com",
  messagingSenderId: "1066219274592",
  appId: "1:1066219274592:web:ed1c7a73bb82c4244e1e05"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInwithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRe = () => signInWithRedirect(auth, provider)

const db = getFirestore();

export const addCollectioAndDocuments = async (collectionKey, objectsToadd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToadd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
    console.log("done")
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshop = await getDocs(q);
  const categoryMap = querySnapshop.docs.reduce((acc, docSnapShop) => {
    const {title, items} = docSnapShop.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;
}

export const createUserDocFromAuth = async (userAuth, addittionalInfo={}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...addittionalInfo
      })
    } catch (error) {
      console.log("error creating the user", error.message)
    }
  }
  return userDocRef
}


export const createAuthuserwithemailandpassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthuserwithemailandpassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}


export const SignOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener =  (callback) => onAuthStateChanged(auth, callback)