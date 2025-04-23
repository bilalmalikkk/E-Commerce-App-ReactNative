import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const ProfileContext = createContext();

export default function ProfileProvider({ children }) {
  const defaultProfile = {
    name: "",
    email: "",
    address: "",
    photoURL: null,
  };

  const [userProfile, setUserProfile] = useState(defaultProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const savedProfile = await AsyncStorage.getItem("userProfile");
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        } else {
          const { displayName, email, photoURL } = firebaseUser;
          setUserProfile({
            name: displayName || "Not set",
            email,
            address: "Not set",
            photoURL: photoURL || null,
          });
        }
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserProfile(defaultProfile);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const saveData = async () => {
      if (isLoggedIn) {
        try {
          await AsyncStorage.setItem(
            "userProfile",
            JSON.stringify(userProfile)
          );
        } catch (error) {
          console.error("Failed to save profile:", error);
        }
      }
    };
    saveData();
  }, [userProfile, isLoggedIn]);

  const updateProfile = (newProfile) => {
    setUserProfile(newProfile);
  };

  const validateProfile = (profile) => {
    if (!profile.name || !profile.email || !profile.address) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const login = async (email, password) => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return false;
    }

    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return false;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return true;
    } catch (error) {
      console.error("Login failed:", error.code, error.message);
      if (error.code === "auth/invalid-email") {
        alert("The email address is invalid.");
      } else if (error.code === "auth/user-not-found") {
        alert("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert("Login failed. Please try again.");
      }
      return false;
    }
  };

  const signup = async (newProfile, password) => {
    if (validateProfile(newProfile)) {
      try {
        // Ensure that password is passed correctly
        if (!password || password.trim() === "") {
          throw new Error("Password is required");
        }

        await createUserWithEmailAndPassword(
          auth,
          newProfile.email.trim(),
          password
        );

        await signOut(auth);

        setUserProfile(newProfile);
        await AsyncStorage.setItem("userProfile", JSON.stringify(newProfile));

        alert("You have successfully signed up!");

        navigation.navigate("Login"); // Change "Login" to the actual name of your login screen
      } catch (error) {
        console.error("Signup failed:", error.message);
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use. Please try another one.");
        } else if (error.code === "auth/weak-password") {
          alert("Password should be at least 6 characters.");
        } else {
          alert("Signup failed. Please try again.");
        }
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userProfile");
      setIsLoggedIn(false);
      setUserProfile(defaultProfile); // Reset to default profile
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const clearProfile = async () => {
    setUserProfile(defaultProfile);
    setIsLoggedIn(false);
    try {
      await AsyncStorage.removeItem("userProfile");
    } catch (error) {
      console.error("Failed to clear profile:", error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        updateProfile,
        clearProfile,
        validateProfile,
        login,
        signup,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
