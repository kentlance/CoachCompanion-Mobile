import Feather from "@expo/vector-icons/Feather";
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
  const [selectedDrillIndex, setSelectedDrillIndex] = useState<number | null>(
    null
  );

  const toggleDrillStatus = (index: number) => {
    const updated = [...drillStatuses];
    updated[index] = updated[index] === "completed" ? "assigned" : "completed";
    setDrillStatuses(updated);
  };

  const markAllCompleted = () => {
    setDrillStatuses(drillStatuses.map(() => "completed"));
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{regimen?.name}</Text>
        <View style={styles.infoRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {typeof regimen?.focus === "string"
                ? regimen.focus
                : regimen?.focus.category}
            </Text>
          </View>
          <Text style={styles.dateText}>Due: {regimen?.due_date}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Drills Checklist</Text>
        <FlatList
          data={assignedRegimen.assignedDrillsId}
          keyExtractor={(drillId) => drillId.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const drill = drills_list.find((d) => d.id === item);
            const isDone = drillStatuses[index] === "completed";

            return (
              <View style={[styles.drillCard, isDone && styles.drillCardDone]}>
                <View style={styles.drillInfo}>
                  <Text style={[styles.drillName, isDone && styles.textDone]}>
                    {drill?.name || `Drill ${item}`}
                  </Text>
                  <View style={styles.statusRow}>
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: isDone ? "#4caf50" : "#fb8c00" },
                      ]}
                    />
                    <Text style={styles.statusText}>
                      {isDone ? "Finished" : "In Progress"}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <Pressable
                    style={styles.viewButton}
                    onPress={() => {
                      setSelectedDrill(drill);
                      setSelectedDrillIndex(index);
                    }}
                  >
                    <Feather name="eye" size={16} color="#666" />
                  </Pressable>
                  {!isDone && (
                    <Pressable
                      style={styles.checkButton}
                      onPress={() => toggleDrillStatus(index)}
                    >
                      <Feather name="check" size={20} color="white" />
                    </Pressable>
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>

      <Pressable style={styles.buttonAll} onPress={markAllCompleted}>
        <Text style={styles.buttonAllText}>Complete All Drills</Text>
      </Pressable>

      <Modal visible={!!selectedDrill} animationType="slide">
        {selectedDrill && selectedDrillIndex !== null && (
          <DrillModal
            drill={selectedDrill}
            onClose={() => setSelectedDrill(null)}
            showCompleteButton={true}
            onMarkComplete={() => toggleDrillStatus(selectedDrillIndex)}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    padding: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 24, fontWeight: "800", color: "#1A1C1E", marginBottom: 8 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: "#EC1D2515",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#EC1D25",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
  dateText: { color: "#8E8E93", fontSize: 13 },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1C1E",
    marginTop: 20,
    marginBottom: 12,
  },
  drillCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  drillCardDone: { backgroundColor: "#F1F3F5", opacity: 0.8 },
  drillInfo: { flex: 1 },
  drillName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  textDone: { textDecorationLine: "line-through", color: "#8E8E93" },
  statusRow: { flexDirection: "row", alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 12, color: "#666" },
  actionRow: { flexDirection: "row", alignItems: "center" },
  viewButton: { padding: 8, marginRight: 8 },
  checkButton: { backgroundColor: "#4caf50", padding: 8, borderRadius: 8 },
  buttonAll: {
    backgroundColor: "#1A1C1E",
    margin: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonAllText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default AssignedRegimenModal;
