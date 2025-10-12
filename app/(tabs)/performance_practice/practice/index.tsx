// app/performance_practice/practice/index.tsx
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DrillFormModal from "./drill_form_modal";
import DrillModal from "./drill_modal";
import drills_list from "./drills_list";
import GenerateRegimenModal from "./generate_regimen_modal";
import PracticeCategoryModal from "./practice_category_modal";
import PracticeFormModal from "./practice_form_modal";
import practices_list_initial from "./practices";

interface PracticeCategory {
  id: number;
  name: string;
  description: string;
  skill: string[];
}

interface DrillItem {
  id: number;
  name: string;
  description: string;
  from_id: number;
  steps: string[];
  good_for: string[];
}

const PracticeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [drillSearchQuery, setDrillSearchQuery] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [practices, setPractices] = useState<PracticeCategory[]>(
    practices_list_initial
  );

  const [isRegimenModalVisible, setIsRegimenModalVisible] = useState(false);

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingPractice, setEditingPractice] =
    useState<PracticeCategory | null>(null);

  const [selectedDrill, setSelectedDrill] = useState<DrillItem | null>(null);
  const [isDrillModalVisible, setIsDrillModalVisible] = useState(false);

  const [isDrillFormVisible, setIsDrillFormVisible] = useState(false);
  const [editingDrill, setEditingDrill] = useState<DrillItem | null>(null);

  const filteredPractices = practices.filter((practice) =>
    practice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter drills first by category, then by drill search query
  const drillsForSelectedCategory = selectedCategoryId
    ? drills_list.filter((drill) => drill.from_id === selectedCategoryId)
    : [];

  const filteredDrills = drillsForSelectedCategory.filter(
    (drill) =>
      drill.name.toLowerCase().includes(drillSearchQuery.toLowerCase()) ||
      drill.description
        .toLowerCase()
        .includes(drillSearchQuery.toLowerCase()) ||
      drill.steps.some((step) =>
        step.toLowerCase().includes(drillSearchQuery.toLowerCase())
      )
  );

  const handleCategorySelect = (id: number) => {
    setSelectedCategoryId(id);
    setDrillSearchQuery(""); // Clear drill search when changing category
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSearchQuery("");
    setDrillSearchQuery("");
  };

  const handleShowGenerateRegimenModal = () => {
    setIsRegimenModalVisible(true);
  };

  const handleGenerateRegimen = () => {
    setIsRegimenModalVisible(false);
  };

  const handleAddPractice = () => {
    setEditingPractice(null);
    setIsFormModalVisible(true);
  };

  const handleEditPractice = (id: number) => {
    const practiceToEdit = practices.find((p) => p.id === id);
    if (practiceToEdit) {
      setEditingPractice(practiceToEdit);
      setIsFormModalVisible(true);
    }
  };

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
            if (selectedCategoryId === id) {
              setSelectedCategoryId(null); // Deselect if current category is deleted
            }
          },
        },
      ]
    );
  };

  const handleSavePractice = (
    id: number | null,
    name: string,
    description: string,
    skill: string
  ) => {
    if (id) {
      setPractices((prevPractices) =>
        prevPractices.map((p) =>
          p.id === id ? { ...p, name, description, skill: [skill] } : p
        )
      );
    } else {
      const newId =
        practices.length > 0 ? Math.max(...practices.map((p) => p.id)) + 1 : 1;
      const newPractice: PracticeCategory = {
        id: newId,
        name,
        description,
        skill: [skill],
      };
      setPractices((prevPractices) => [...prevPractices, newPractice]);
    }
    setIsFormModalVisible(false);
    setEditingPractice(null);
  };

  const handleDrillPress = (drill: DrillItem) => {
    setSelectedDrill(drill);
    setIsDrillModalVisible(true);
  };

  const handleCloseDrillModal = () => {
    setIsDrillModalVisible(false);
    setSelectedDrill(null);
  };

  const handleAddDrill = () => {
    setEditingDrill(null);
    setIsDrillFormVisible(true);
  };

  const handleEditDrill = (drill: DrillItem) => {
    setEditingDrill(drill);
    setIsDrillFormVisible(true);
  };

  const handleSaveDrill = (drill: {
    id: number | null;
    from_id: number;
    name: string;
    description: string;
    steps: string[];
    good_for: string[];
  }) => {
    // In a real app, you would update your state or make an API call here
    console.log("Saving drill:", drill);
    // For now, just close the modal
    setIsDrillFormVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <View style={{ flex: 1 }}>
        {selectedCategoryId === null ? (
          <View style={styles.practices_container}>
            {/** if user is athlete, show assigned regimens, if user is coach, show created regimens */}

            <View style={styles.category_header}>
              <Text style={styles.category_text}>Created Regimens</Text>
            </View>
            <View style={styles.category_header}>
              <Text style={styles.category_text}>Practice Regimens</Text>
            </View>
            <View style={styles.category_header}>
              <Text style={styles.category_text}>Practices</Text>
            </View>

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
            </View>

            {/** Floating button */}
            <View style={styles.floatingButtonsContainer}>
              <Pressable
                style={styles.addButton}
                onPress={handleShowGenerateRegimenModal}
              >
                <Text style={styles.addButtonText}>@</Text>
              </Pressable>

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
                  style={{ marginBottom: 10, alignItems: "center" }}
                >
                  <PracticeCategoryModal
                    name={practice.name}
                    description={practice.description}
                    practiceId={practice.id}
                    onEdit={handleEditPractice}
                    onDelete={handleDeletePractice}
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
                {"< Back to Practice Categories"}
              </Text>
            </Pressable>

            {selectedCategoryId && (
              <Text style={styles.mainHeader}>
                {practices.find((p) => p.id === selectedCategoryId)?.name ||
                  "Drills"}
              </Text>
            )}

            <TextInput
              style={styles.search_input}
              placeholder="Search drills"
              value={drillSearchQuery}
              onChangeText={(text) => setDrillSearchQuery(text)}
            />

            <View style={styles.drillsHeader}>
              <Text style={styles.drillsCountText}>
                Drills: {filteredDrills.length}
              </Text>
            </View>
            <View style={styles.floatingButtonsContainer}>
              <Pressable onPress={handleAddDrill} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            </View>

            {filteredDrills.length > 0 ? (
              <FlatList
                data={filteredDrills}
                renderItem={({ item }: { item: DrillItem }) => (
                  <Pressable
                    onPress={() => handleDrillPress(item)}
                    style={styles.drill_container}
                  >
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
                    <Pressable
                      onPress={() => handleEditDrill(item)}
                      style={styles.editButton}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </Pressable>
                  </Pressable>
                )}
                keyExtractor={(item: DrillItem) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
              />
            ) : (
              <Text style={styles.noDrillsText}>
                No drills found for this category or search.
              </Text>
            )}
          </View>
        )}
      </View>
      <Modal
        visible={isDrillModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedDrill && (
          <DrillModal drill={selectedDrill} onClose={handleCloseDrillModal} />
        )}
      </Modal>
      <GenerateRegimenModal
        visible={isRegimenModalVisible}
        onClose={() => setIsRegimenModalVisible(false)}
        onSave={handleGenerateRegimen}
      />

      <PracticeFormModal
        visible={isFormModalVisible}
        onClose={() => {
          setIsFormModalVisible(false);
          setEditingPractice(null);
        }}
        onSave={handleSavePractice}
        initialPractice={editingPractice}
        existingPractices={practices}
      />
      <DrillFormModal
        visible={isDrillFormVisible}
        onClose={() => {
          setIsDrillFormVisible(false);
          setEditingDrill(null);
        }}
        onSave={handleSaveDrill}
        initialDrill={editingDrill}
        categoryId={selectedCategoryId || 0}
        practices={practices}
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
  category_header: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 70,
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
  },
  category_text: {
    textAlign: "center",
    fontSize: 20,
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
    paddingHorizontal: 5,
  },
  practicesCountText: {
    fontSize: 16,
    color: "#555",
    flex: 1,
  },
  drillsCountText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#EC1D25",
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
  },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: 40,
    right: 30,
    gap: 10,
    zIndex: 10,
  },
  drills_screen_container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
    position: "relative",
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
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#007AFF",
    padding: 6,
    borderRadius: 12,
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
  },
  drillsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  mainHeader: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
});
