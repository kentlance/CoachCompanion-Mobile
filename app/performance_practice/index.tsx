import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./header";
import Performance from "./performance/performance_main";
import Practice from "./practice/practice_main";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function PerformancePractice() {
  const [selectedTab, setSelectedTab] = useState("Practice");

  return (
    <SafeAreaView>
      <Header />
      <View style={styles.container}>
        {/* This is wrong */}
        {selectedTab === "Practice" ? <Practice /> : <Performance />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -80,
  },
  tabLabel: {
    fontSize: 20,
  },
  tabLabelContainer: {
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  selectedTabContainer: {
    borderBottomColor: "red",
  },
});
