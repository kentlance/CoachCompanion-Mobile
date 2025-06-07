// app/performance_practice/practice/index.tsx
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import drills_list from "./drills_list";
import practices_list_initial from "./practices";
import PracticeCategoryModal from "./practice_category_modal";
import PracticeFormModal from "./practice_form_modal";

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
  const [practices, setPractices] = useState<PracticeCategory[]>(
    practices_list_initial
  );

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingPractice, setEditingPractice] =
    useState<PracticeCategory | null>(null);

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
    setEditingPractice(null);
    setIsFormModalVisible(true);
  };

  // MODIFIED: handleEditPractice now directly accepts the ID
  const handleEditPractice = (id: number) => {
    const practiceToEdit = practices.find((p) => p.id === id);
    if (practiceToEdit) {
      setEditingPractice(practiceToEdit);
      setIsFormModalVisible(true);
    }
  };

  // Keep handleDeletePractice as is, it's called from modal now
  const handleDeletePractice = (id: number, name: string) => {
    Alert.alert(
      "Delete Practice",
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPractices((prevPractices) =>
              prevPractices.filter((p) => p.id !== id)
            );
            // If the deleted category was the selected one, deselect it
            if (selectedCategoryId === id) {
              setSelectedCategoryId(null);
            }
          },
        },
      ]
    );
  };

  const handleSavePractice = (
    id: number | null,
    name: string,
    description: string
  ) => {
    if (id) {
      setPractices((prevPractices) =>
        prevPractices.map((p) =>
          p.id === id ? { ...p, name: name, description: description } : p
        )
      );
    } else {
      const newId =
        practices.length > 0 ? Math.max(...practices.map((p) => p.id)) + 1 : 1;
      const newPractice: PracticeCategory = {
        id: newId,
        name: name,
        description: description,
      };
      setPractices((prevPractices) => [...prevPractices, newPractice]);
    }
    setIsFormModalVisible(false);
    setEditingPractice(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
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
                // Removed practiceItemContainer here, now PracticeCategoryModal handles the whole item styling
                <Pressable
                  key={practice.id}
                  onPress={() => handleCategorySelect(practice.id)}
                  style={{ marginBottom: 10, alignItems: "center" }} // Center the modal
                >
                  <PracticeCategoryModal
                    name={practice.name}
                    description={practice.description}
                    practiceId={practice.id} // Pass the ID
                    onEdit={handleEditPractice} // Pass the edit callback
                    onDelete={handleDeletePractice} // Pass the delete callback
                  />
                </Pressable>
              )}
              contentContainerStyle={styles.flatListContent}
              ListEmptyComponent={() => (
                <Text style={styles.noPracticesText}>No practices found.</Text>
              )}
            />
          </View>
        ) : (
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

      <PracticeFormModal
        visible={isFormModalVisible}
        onClose={() => {
          setIsFormModalVisible(false);
          setEditingPractice(null);
        }}
        onSave={handleSavePractice}
        initialPractice={editingPractice}
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
    borderRadius: 20,
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
    lineHeight: 24,
    fontWeight: "bold",
  },
  // REMOVED: practiceItemContainer, itemActions, actionButton, editButton, deleteButton, actionButtonText
  // as these styles are now handled within PracticeCategoryModal
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
    // This style was part of the old container, now it's only about aligning children
    // The width comes from the PracticeCategoryModal itself
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
