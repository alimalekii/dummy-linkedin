import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Please provide your own firebaseConfig here, you get it for free from fir by signing up.

// const firebaseConfig = {
// apiKey:
// authDomain:
// projectId:
// storageBucket:
// messagingSenderId:
// appId:
// measurementId:
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export { auth, provider, storage };

export default db;
