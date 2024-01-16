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
import { useSignUp } from "@clerk/clerk-expo";

const SignUpWithEmailAndPassword = () => {
  useWarmUpBrowser();

  const { signUp, setActive, isLoaded } = useSignUp();

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignUp = await signUp.create({
        emailAddress,
        username,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="user@email.com"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
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

      <Button onPress={onSignUpPress} title="Login" color={"#6c47ff"}></Button>

      <Pressable style={styles.button}>
        <Text>Forgot password?</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Already have an account?</Text>
      </Pressable>
    </View>
  );
};

export default SignUpWithEmailAndPassword;

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
