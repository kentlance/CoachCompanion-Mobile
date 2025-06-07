// app/performance_practice/performance/index.tsx
import { RelativePathString, useRouter } from "expo-router"; // To navigate to athlete_overall_view
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AthleteCard from "./athlete_card";
import athlete_list from "./athlete_list";
import { Athlete } from "./interfaces";

export default function PerformanceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAthletes = athlete_list.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.number.includes(searchQuery) // Search by jersey number too
  );

  const handleAthletePress = (athleteId: number) => {
    const path = `/performance_practice/performance/${athleteId}`;
    router.push(path as RelativePathString);
  };

  // Placeholder for Team Performance Summary
  const TeamPerformanceSummary = () => (
    <Pressable
      style={styles.teamSummaryButton}
      onPress={() => {
        // Future logic for team performance summary
        console.log("Team Performance Summary clicked!");
        alert("Team Performance Summary - Coming Soon!");
      }}
    >
      <Text style={styles.teamSummaryButtonText}>View Team Performance</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Team Performance Summary Section */}
      <TeamPerformanceSummary />

      {/* Search Bar for Athletes */}
      <TextInput
        style={styles.search_input}
        placeholder="Search athletes by name or number"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Athletes Count */}
      <Text style={styles.athletesCountText}>
        Athletes: {filteredAthletes.length}
      </Text>

      {/* List of Athletes */}
      {filteredAthletes.length > 0 ? (
        <FlatList
          data={filteredAthletes}
          keyExtractor={(item: Athlete) => item.id.toString()}
          numColumns={2} // Display athletes in a 2-column grid
          columnWrapperStyle={styles.row} // Style for each row in the grid
          renderItem={({ item: athlete }: { item: Athlete }) => (
            <Pressable
              key={athlete.id}
              onPress={() => handleAthletePress(athlete.id)}
              style={styles.athleteCardPressable}
            >
              <AthleteCard athlete={athlete} />
            </Pressable>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noAthletesText}>No athletes found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  teamSummaryButton: {
    backgroundColor: "#EC1D25", // Your accent color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamSummaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  search_input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  athletesCountText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 10,
  },
  athleteCardPressable: {
    marginHorizontal: 5,
    flex: 1,
    maxWidth: "48%",
    alignItems: "center",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noAthletesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
