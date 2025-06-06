// app/performance_practice/performance/athlete_modal.tsx
// NOTE: Renamed from athlete_modal.tsx to be consistent with practice_category_modal pattern
// but it's not actually a "modal" in the pop-up sense. It's a display card.
// Consider renaming to AthleteCard.tsx for clarity if you prefer.
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Athlete } from "./interfaces"; // Import the Athlete interface

interface AthleteModalProps {
  athlete: Athlete; // Pass the entire athlete object
}

export default function AthleteModal({ athlete }: AthleteModalProps) {
  return (
    <View style={styles.container}>
      {/* Athlete Image Placeholder */}
      <View style={styles.athlete_image_placeholder}>
        <Text style={styles.athlete_number}>{athlete.number}</Text>
      </View>
      <Text style={styles.athlete_name}>{athlete.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: 150,
    height: 180,
    justifyContent: "center",
  },
  athlete_image_placeholder: {
    width: 80,
    height: 80,
    borderRadius: 40, // Makes it a circle
    backgroundColor: "#ccc", // Grey placeholder for image
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  athlete_number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  athlete_name: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
