import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";
import * as AuthSession from "expo-auth-session";

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "198617014563-tm09dj7f1gg0beaerlgj112f1o5fvqpq.apps.googleusercontent.com",
    iosClientId:
      "198617014563-tm09dj7f1gg0beaerlgj112f1o5fvqpq.apps.googleusercontent.com",
    androidClientId:
      "198617014563-tm09dj7f1gg0beaerlgj112f1o5fvqpq.apps.googleusercontent.com",
    webClientId:
      "198617014563-tm09dj7f1gg0beaerlgj112f1o5fvqpq.apps.googleusercontent.com",
    useProxy: true,
  });

  const signInWithGoogle = async () => {
    console.log(
      "🔍 Redirect URI:",
      AuthSession.makeRedirectUri({ useProxy: true })
    );

    const result = await promptAsync();
    if (result.type === "success") {
      const { id_token, access_token } = result.authentication;
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      return await signInWithCredential(auth, credential);
    } else {
      throw new Error("Google sign-in cancelled");
    }
  };

  return { request, signInWithGoogle };
};
