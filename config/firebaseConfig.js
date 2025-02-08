import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBba0FZQGmg1pFasdkMRzGL7O7AEz7mjh8",
  authDomain: "fir-project-3012b.firebaseapp.com",
  databaseURL: "https://fir-project-3012b-default-rtdb.firebaseio.com",
  projectId: "fir-project-3012b",
  storageBucket: "fir-project-3012b.appspot.com",
  messagingSenderId: "567301248875",
  appId: "1:567301248875:web:9b9db801a8a20f822e9e2e",
  measurementId: "G-5S11ECNGLZ"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
// Initialisation de l'authentification avec persistance AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
// Initialisation des services Firebase
const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, database, db, storage};

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth'; // Pour l'authentification
// import { getDatabase } from 'firebase/database'; // Pour Realtime Database

// const firebaseConfig = {
//   apiKey: "AIzaSyBba0FZQGmg1pFasdkMRzGL7O7AEz7mjh8",
//   authDomain: "fir-project-3012b.firebaseapp.com",
//   databaseURL: "https://fir-project-3012b-default-rtdb.firebaseio.com", // URL de Realtime Database
//   projectId: "fir-project-3012b",
//   storageBucket: "fir-project-3012b.appspot.com",
//   messagingSenderId: "567301248875",
//   appId: "1:567301248875:web:9b9db801a8a20f822e9e2e",
//   measurementId: "G-5S11ECNGLZ"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); // Authentification
// const database = getDatabase(app); // Realtime Database

// export { auth, database };