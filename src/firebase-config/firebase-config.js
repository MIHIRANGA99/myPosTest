import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB5SQovTmdvGvftTrz6e6ai-4q6MBMrdSQ",
    authDomain: "mypos-25457.firebaseapp.com",
    projectId: "mypos-25457",
    storageBucket: "mypos-25457.appspot.com",
    messagingSenderId: "928071791694",
    appId: "1:928071791694:web:844e82e6bbd4f19ece3f1f"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);