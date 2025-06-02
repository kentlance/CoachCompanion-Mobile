import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Performance from "./performance/performance_main";
import Practice from "./practice/practice_main";

export default function PerformancePractice() {
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
        {/* Practice tab button */}
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
        {/* Performance tab button */}
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

      <View style={{ flex: 1 }}>
        {selectedTab === "Practice" ? <Practice /> : <Performance />}
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
