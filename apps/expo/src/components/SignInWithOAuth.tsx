import { useOAuth } from "@clerk/clerk-expo";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useSignIn } from "@clerk/clerk-expo";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_discord" });
  const { signIn, setActive, isLoaded } = useSignIn();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: username,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  const handleSignInWithDiscordPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <Button onPress={onSignInPress} title="Login" color={"#6c47ff"}></Button>

      <Pressable style={styles.button}>
        <Text>Forgot password?</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Create Account</Text>
      </Pressable>
    </View>
  );
};

export default SignInWithOAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});
