import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <View style={{ backgroundColor: "#E9E9E9", flex: 1 }}>
      <SafeAreaView edges={["top"]}></SafeAreaView>
    </View>
  );
}
