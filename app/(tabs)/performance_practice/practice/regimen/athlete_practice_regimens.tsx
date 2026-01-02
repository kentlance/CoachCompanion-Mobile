// app/performance_practice/practice_regimens/athlete_practice_regimens.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import regimens from "../regimens";
import assignedRegimens from "./assignedRegimens";
import AssignedRegimenModal from "./assigned_regimen_modal";

interface Props {
  athleteId: number;
  athleteName: string;
}

// Reusable Collapsible for this view
const CollapsibleCategory = ({ title, count, children }: any) => {
  const [expanded, setExpanded] = useState(true);
  if (count === 0) return null; // Hide category if empty

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.categoryTitle}>{title}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.countText}>{count}</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#666"
          />
        </View>
      </TouchableOpacity>
      {expanded && <View>{children}</View>}
    </View>
  );
};

export default function AthletePracticeRegimens({
  athleteId,
  athleteName,
}: Props) {
  const [selectedAssignedId, setSelectedAssignedId] = useState<number | null>(
    null
  );

  // 1. Get all regimens for this athlete
  const athleteAssignments = assignedRegimens.filter(
    (ar) => ar.assignedAthleteId === athleteId
  );

  // 2. Categorize
  const assigned = athleteAssignments.filter(
    (a) => a.regimenStatus === "assigned"
  );
  const missed = athleteAssignments.filter((a) => a.regimenStatus === "missed");
  const done = athleteAssignments.filter(
    (a) => a.regimenStatus === "completed"
  );

  const renderRegimenItem = (assignment: any) => {
    const regimen = regimens.find((r) => r.id === assignment.regimenId);
    return (
      <TouchableOpacity
        key={assignment.id}
        style={styles.regimenRow}
        onPress={() => setSelectedAssignedId(assignment.id)}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="clipboard-outline" size={20} color="white" />
        </View>
        <View style={styles.regimenInfo}>
          <Text style={styles.regimenName}>{regimen?.name}</Text>
          <Text style={styles.regimenDate}>Due: {regimen?.due_date}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#CCC" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.athleteHeader}>
          <Text style={styles.athleteNameText}>{athleteName}</Text>
          <Text style={styles.athleteSub}>Practice Overview</Text>
        </View>

        <CollapsibleCategory title="Assigned" count={assigned.length}>
          {assigned.map(renderRegimenItem)}
        </CollapsibleCategory>

        <CollapsibleCategory title="Missed" count={missed.length}>
          {missed.map(renderRegimenItem)}
        </CollapsibleCategory>

        <CollapsibleCategory title="Done" count={done.length}>
          {done.map(renderRegimenItem)}
        </CollapsibleCategory>
      </ScrollView>

      {selectedAssignedId && (
        <Modal
          visible={!!selectedAssignedId}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedAssignedId(null)}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedAssignedId(null)}>
                <Ionicons name="close" size={28} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Regimen Details</Text>
              <View style={{ width: 28 }} />
            </View>

            <AssignedRegimenModal assignedRegimenId={selectedAssignedId!} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  athleteHeader: { padding: 20, backgroundColor: "white", marginBottom: 8 },
  athleteNameText: { fontSize: 22, fontWeight: "bold" },
  athleteSub: { color: "#666", fontSize: 14 },
  categoryContainer: {
    backgroundColor: "white",
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  categoryTitle: { fontSize: 16, fontWeight: "600", color: "#444" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  countText: { marginRight: 8, color: "#888" },
  regimenRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fafafa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  regimenInfo: { flex: 1 },
  regimenName: { fontSize: 15, fontWeight: "500", color: "#333" },
  regimenDate: { fontSize: 12, color: "#888", marginTop: 2 },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
