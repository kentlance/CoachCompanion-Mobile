import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center",
  },
});
