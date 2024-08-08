import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

import { Images } from "@/theme";
import Input from "@/components/Inputs/Input";
import PrimaryButton from "@/components/Buttons";
import { useRouter } from "expo-router";
import { loginPost } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const data = await loginPost(loginForm);
      if (data?.access_token) {
        await AsyncStorage.setItem("token", data.access_token);
        await AsyncStorage.setItem("type", data.token_type);
        router.replace("/(tabs)/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.loginContainer}>
        <View style={styles.imageLogoContainer}>
          <Image
            source={Images.TechnopartnerLogo}
            style={styles.imageLogoContainer}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginFormContainer}>
          <Input
            label="Email"
            placeholder="Email"
            value={loginForm.username}
            onChangeText={(e) =>
              setLoginForm((prev) => ({ ...prev, username: e }))
            }
          />
          <Input
            label="Password"
            secureTextEntry
            placeholder="Password"
            value={loginForm.password}
            onChangeText={(e) =>
              setLoginForm((prev) => ({ ...prev, password: e }))
            }
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleLogin}>Login</PrimaryButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    padding: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 50,
  },
  imageLogoContainer: {
    height: 150,
    width: 350,
  },
  loginFormContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 30,
    paddingHorizontal: 50,
  },
  buttonContainer: {
    paddingHorizontal: 50,
  },
});

export default LoginScreen;
