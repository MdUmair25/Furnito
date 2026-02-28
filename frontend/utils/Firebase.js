import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCC5d6xxVvTNxJSOzMVz5ZMGYiLn0MmxY8",
  authDomain: "loginfurnito.firebaseapp.com",
  projectId: "loginfurnito",
  storageBucket: "loginfurnito.firebasestorage.app",
  messagingSenderId: "455482406021",
  appId: "1:455482406021:web:7c6d864bde337bb4dae5ec",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export { auth, provider };
