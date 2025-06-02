import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Header() {
  const [selectedTab, setSelectedTab] = useState("Practice");

  return (
    <SafeAreaView>
      <View
        id="main"
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Pressable onPress={() => setSelectedTab("Practice")}>
          <View
            style={[
              styles.tabLabelContainer,
              selectedTab === "Practice" && styles.selectedTabContainer,
            ]}
          >
            <Text style={styles.tabLabel}>Practice</Text>
          </View>
        </Pressable>
        <Text style={{ marginHorizontal: 10 }}>|</Text>
        <Pressable onPress={() => setSelectedTab("Performance")}>
          <View
            style={[
              styles.tabLabelContainer,
              selectedTab === "Performance" && styles.selectedTabContainer,
            ]}
          >
            <Text style={styles.tabLabel}>Performance</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
