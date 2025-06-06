// app/_layout.tsx
import { useFonts } from "expo-font";
import "react-native-reanimated";

import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      {/* This is your root navigator */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Delegates to (tabs) group */}
      {/* Add other root screens here if needed */}
    </Stack>
  );
}
