import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import athleteList from "../performance/athlete_list";
import drills_list from "./drills_list";
import practices_list from "./practices"; // Added to organize drills

export default function EditRegimenScreen() {
  const { regimenData } = useLocalSearchParams();
  const router = useRouter();
  const initialData = JSON.parse(regimenData as string);

  const [regimen, setRegimen] = useState(initialData);
  const [isManualModalVisible, setIsManualModalVisible] = useState(false);
  const [activeAthleteId, setActiveAthleteId] = useState<number | null>(null);

  const handleFinalSave = () => {
    if (regimen.isEditing) {
      // LOGIC FOR UPDATING EXISTING
      console.log("Updating Regimen ID:", regimen.id);
      console.log("New Drill Assignments:", regimen.drillAssignments);

      // Perform database UPDATE here
      Alert.alert("Updated", `${regimen.name} has been updated.`);
    } else {
      // LOGIC FOR CREATING NEW
      console.log("Creating New Regimen:", regimen.name);

      // Perform database INSERT here
      Alert.alert("Created", "New regimen saved to database.");
    }

    router.replace("/performance_practice/practice");
  };

  const handleCancel = () => {
    router.replace("/performance_practice/practice"); // Return to index without saving
  };

  const removeDrillFromAthlete = (athleteId: number, drillId: number) => {
    const updatedAssignments = { ...regimen.drillAssignments };
    updatedAssignments[athleteId] = updatedAssignments[athleteId].filter(
      (id: number) => id !== drillId
    );
    setRegimen({ ...regimen, drillAssignments: updatedAssignments });
  };

  const addManualDrill = (drillId: number) => {
    if (activeAthleteId === null) return;

    const updatedAssignments = { ...regimen.drillAssignments };
    if (!updatedAssignments[activeAthleteId].includes(drillId)) {
      updatedAssignments[activeAthleteId] = [
        ...updatedAssignments[activeAthleteId],
        drillId,
      ];
      setRegimen({ ...regimen, drillAssignments: updatedAssignments });
    }
    setIsManualModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Review Recommendations</Text>
        <Text style={styles.subtitle}>Customize drills for each athlete</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {Object.keys(regimen.drillAssignments).map((athleteIdStr) => {
          const athleteId = parseInt(athleteIdStr);
          const athlete = athleteList.find((a) => a.athlete_no === athleteId);
          const assignedDrillIds = regimen.drillAssignments[athleteId];

          return (
            <View key={athleteId} style={styles.athleteCard}>
              <Text style={styles.athleteName}>
                {athlete?.first_name} {athlete?.last_name}
              </Text>

              {assignedDrillIds.map((drillId: number) => {
                const drill = drills_list.find((d) => d.id === drillId);
                return (
                  <View key={drillId} style={styles.drillRow}>
                    <Text style={styles.drillName}>{drill?.name}</Text>
                    <TouchableOpacity
                      onPress={() => removeDrillFromAthlete(athleteId, drillId)}
                    >
                      <Feather name="x-circle" size={20} color="#EC1D25" />
                    </TouchableOpacity>
                  </View>
                );
              })}

              {/* Add Manual Drill Button */}
              <TouchableOpacity
                style={styles.addDrillButton}
                onPress={() => {
                  setActiveAthleteId(athleteId);
                  setIsManualModalVisible(true);
                }}
              >
                <Feather name="plus" size={16} color="#007AFF" />
                <Text style={styles.addDrillText}>Add Manual Drill</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Manual Drill Selection Modal */}
      <Modal visible={isManualModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Drill</Text>
          <ScrollView>
            {practices_list.map((practice) => (
              <View key={practice.id} style={styles.categorySection}>
                <Text style={styles.categoryTitle}>{practice.name}</Text>
                {drills_list
                  .filter((drill) => drill.from_id === practice.id)
                  .map((drill) => (
                    <TouchableOpacity
                      key={drill.id}
                      style={styles.modalDrillRow}
                      onPress={() => addManualDrill(drill.id)}
                    >
                      <Text>{drill.name}</Text>
                      <Feather name="plus-circle" size={18} color="#4CAF50" />
                    </TouchableOpacity>
                  ))}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setIsManualModalVisible(false)}
          >
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleFinalSave}>
          <Text style={styles.saveButtonText}>Confirm & Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 20, fontWeight: "800", color: "#1A1C1E" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  scroll: { flex: 1, padding: 16 },
  athleteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  athleteName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EC1D25",
    marginBottom: 12,
  },
  drillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  drillName: { fontSize: 14, color: "#333" },
  addDrillButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 8,
  },
  addDrillText: { color: "#007AFF", marginLeft: 8, fontWeight: "600" },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  saveButton: {
    flex: 2,
    backgroundColor: "#EC1D25",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  saveButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: { color: "#666", fontWeight: "700", fontSize: 16 },
  modalContainer: { flex: 1, padding: 20, paddingTop: 60 },
  modalTitle: { fontSize: 22, fontWeight: "800", marginBottom: 20 },
  categorySection: { marginBottom: 20 },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666",
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 4,
  },
  modalDrillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeModalButton: {
    marginTop: 20,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 12,
  },
  closeModalText: { fontWeight: "700", color: "#333" },
});
