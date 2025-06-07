// app/performance_practice/practice/index.tsx
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AddPracticeModal from "./add_practice_modal";
import drills_list from "./drills_list"; // drills data
import practices_list_initial from "./practices"; // categories data
import PracticeCategoryModal from "./practice_category_modal"; // Your category display component

// Define interfaces for your data
interface PracticeCategory {
  id: number;
  name: string;
  description: string;
}

interface DrillItem {
  id: number;
  name: string;
  description: string;
  from_id: number;
  steps: string[];
}

const PracticeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // Manage practices list
  const [practices, setPractices] = useState<PracticeCategory[]>(
    practices_list_initial
  );

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const filteredPractices = practices.filter((practice) =>
    practice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDrills = selectedCategoryId
    ? drills_list.filter((drill) => drill.from_id === selectedCategoryId)
    : [];

  const handleCategorySelect = (id: number) => {
    setSelectedCategoryId(id);
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSearchQuery("");
  };
  const handleAddPractice = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveNewPractice = (name: string, description: string) => {
    const newId =
      practices.length > 0 ? Math.max(...practices.map((p) => p.id)) + 1 : 1; // Handle empty practices list
    const newPractice: PracticeCategory = {
      id: newId,
      name: name,
      description: description,
    };
    setPractices((prevPractices) => [...prevPractices, newPractice]);
    setIsAddModalVisible(false); // Close modal after saving
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {selectedCategoryId === null ? (
          <View style={styles.practices_container}>
            <TextInput
              style={styles.search_input}
              placeholder="Search practices"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <View style={styles.headerControls}>
              <Text style={styles.practicesCountText}>
                Practices: {filteredPractices.length}
              </Text>
              <Pressable onPress={handleAddPractice} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            </View>
            <FlatList
              data={filteredPractices}
              keyExtractor={(item: PracticeCategory) => item.id.toString()}
              renderItem={({ item: practice }: { item: PracticeCategory }) => (
                <Pressable
                  key={practice.id}
                  onPress={() => handleCategorySelect(practice.id)}
                  style={{ marginBottom: 10 }}
                >
                  <View style={styles.practice_category_container}>
                    <PracticeCategoryModal
                      name={practice.name}
                      description={practice.description}
                    />
                  </View>
                </Pressable>
              )}
              contentContainerStyle={styles.flatListContent}
              // Added for debugging the FlatList itself
              ListEmptyComponent={() => (
                <Text style={styles.noPracticesText}>No practices found.</Text>
              )}
            />
          </View>
        ) : (
          // Render Drills List (conditionally visible)
          <View style={styles.drills_screen_container}>
            <Pressable
              onPress={handleBackToCategories}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>
                {"<- Back to Categories"}
              </Text>
            </Pressable>
            {filteredDrills.length > 0 ? (
              <FlatList
                data={filteredDrills}
                renderItem={({ item }: { item: DrillItem }) => (
                  <View style={styles.drill_container}>
                    <Text style={styles.drill_name}>{item.name}</Text>
                    <Text style={styles.drill_description}>
                      {item.description}
                    </Text>
                    {item.steps && item.steps.length > 0 && (
                      <View style={styles.stepsContainer}>
                        {item.steps.map((step, index) => (
                          <Text key={index} style={styles.stepText}>
                            {step}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}
                keyExtractor={(item: DrillItem) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
              />
            ) : (
              <Text style={styles.noDrillsText}>
                No drills found for this category.
              </Text>
            )}
          </View>
        )}
      </View>
      <AddPracticeModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)} // Callback to close the modal
        onSave={handleSaveNewPractice} // Callback to handle saving the new practice
      />
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  practices_container: {
    padding: 10,
    flex: 1,
  },
  search_input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  practicesCountText: {
    fontSize: 16,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#EC1D25",
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    lineHeight: 24, // Adjust for vertical centering of '+'
    fontWeight: "bold",
  },
  drills_screen_container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#EC1D25",
    fontWeight: "bold",
  },
  drill_container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  drill_name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  drill_description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  stepsContainer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  stepText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 3,
  },
  practice_category_container: {
    alignItems: "center",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noDrillsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  noPracticesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
