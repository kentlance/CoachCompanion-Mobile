import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function JerseyScreen() {
  return (
    <View style={styles.container}>
      <Text>Athlete Management & Monitoring</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
