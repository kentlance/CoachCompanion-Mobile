import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import drills_list from "./drills_list";

interface DrillItem {
  id: number;
  name: string;
  description: string;
  from_id: number;
}

export default function Drills() {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const filteredDrills = drills_list.filter((drill) => drill.from_id === id);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.text_container}>
          <FlatList
            data={filteredDrills}
            renderItem={({ item }: { item: DrillItem }) => (
              <View style={styles.drill_container}>
                <Text style={styles.drill_name}>{item.name}</Text>
                <Text style={styles.drill_description}>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item: DrillItem) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    width: screenWidth * 0.9,
    height: screenHeight * 0.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text_container: {
    marginLeft: 20,
    marginBottom: 20,
  },
  practice_name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  practice_description: {
    fontSize: 14,
    opacity: 0.8,
  },
  drill_container: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drill_name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  drill_description: {
    fontSize: 12,
    opacity: 0.8,
  },
});
