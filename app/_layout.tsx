import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, View } from "react-native";
import { DataProvider } from "@/store/dataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const TechnopartnerLogo = require("../assets/images/logo-technopartner.png");

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const checkOuth = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return router.replace("/(tabs)/");
    } else {
      return router.replace("/login");
    }
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    checkOuth();
  }, [checkOuth]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DataProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerTitle: ({ children, tintColor }) => {
                return <></>;
              },
              headerLeft: () => (
                <View
                  style={{
                    height: 50,
                    width: 150,
                    transform: [{ translateX: -20 }],
                  }}
                >
                  <Image
                    source={TechnopartnerLogo}
                    style={{ width: 150, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DataProvider>
    </ThemeProvider>
  );
}
