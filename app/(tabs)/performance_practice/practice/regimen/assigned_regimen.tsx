import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DrillModal from "../drill_modal";
import drills_list from "../drills_list";
import regimens from "../regimens";
import assignedRegimens from "./assignedRegimens";

interface AssignedRegimen {
  id: number;
  regimenId: number;
  assignedAthleteId: number;
  assignedDrillsId: number[];
  assignedDrillsStatus: string[];
  regimenStatus: string;
}

interface Props {
  assignedRegimenId: number;
}

const AssignedRegimenModal: React.FC<Props> = ({ assignedRegimenId }) => {
  const assignedRegimen = assignedRegimens.find(
    (r) => r.id === assignedRegimenId
  ) as AssignedRegimen;

  const regimen = regimens.find((r) => r.id === assignedRegimen.regimenId);

  const [drillStatuses, setDrillStatuses] = useState(
    assignedRegimen.assignedDrillsStatus
  );

  const [selectedDrill, setSelectedDrill] = useState<any | null>(null);

  const markDrillCompleted = (index: number) => {
    const updated = [...drillStatuses];
    updated[index] = "completed";
    setDrillStatuses(updated);
  };

  const markAllCompleted = () => {
    setDrillStatuses(drillStatuses.map(() => "completed"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{regimen?.name}</Text>
      <Text>
        Focus:{" "}
        {typeof regimen?.focus === "string"
          ? regimen.focus
          : regimen?.focus.category}
      </Text>
      <Text>Due Date: {regimen?.due_date}</Text>
      <Text>Status: {assignedRegimen.regimenStatus}</Text>

      <Text style={styles.sectionTitle}>Assigned Drills:</Text>
      <FlatList
        data={assignedRegimen.assignedDrillsId}
        keyExtractor={(drillId) => drillId.toString()}
        renderItem={({ item, index }) => {
          const drill = drills_list.find((d) => d.id === item);
          return (
            <View style={styles.drillRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.drillName}>
                  {drill?.name || `Drill ${item}`}
                </Text>
                <Text>Status: {drillStatuses[index]}</Text>
              </View>
              {drillStatuses[index] !== "completed" && (
                <Pressable
                  style={styles.button}
                  onPress={() => markDrillCompleted(index)}
                >
                  <Text style={styles.buttonText}>Mark Completed</Text>
                </Pressable>
              )}
              <Pressable
                style={styles.detailsButton}
                onPress={() => setSelectedDrill(drill)}
              >
                <Text style={styles.buttonText}>View</Text>
              </Pressable>
            </View>
          );
        }}
      />

      <Pressable style={styles.buttonAll} onPress={markAllCompleted}>
        <Text style={styles.buttonText}>Mark All as Completed</Text>
      </Pressable>

      {/* Drill Modal */}
      <Modal visible={!!selectedDrill} animationType="slide">
        {selectedDrill && (
          <DrillModal
            drill={selectedDrill}
            onClose={() => setSelectedDrill(null)}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  drillRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  drillName: {
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  detailsButton: {
    backgroundColor: "#2196f3",
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonAll: {
    backgroundColor: "#673ab7",
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AssignedRegimenModal;
