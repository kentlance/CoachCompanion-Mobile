import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { ScrollView, View } from "react-native";

import "../global.css";

// main header
import React from "react";
import PerformancePractice from "../app/performance_practice/index";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ backgroundColor: "#E9E9E9", flex: 1 }}>
        <ScrollView>
          <PerformancePractice />
        </ScrollView>
      </View>
    </ThemeProvider>
  );
}
