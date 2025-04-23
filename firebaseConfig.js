import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiMtTc_lHPJD1aVePeqvVpnQ6dmroqFGI",
  authDomain: "soppingstore-ee0c7.firebaseapp.com",
  projectId: "soppingstore-ee0c7",
  storageBucket: "soppingstore-ee0c7.appspot.com",
  messagingSenderId: "198617014563",
  appId: "1:198617014563:web:7560d88da4d503053dac96",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Set persistence to AsyncStorage
});
