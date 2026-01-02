import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import athlete_list from "../../performance/athlete_list";
import regimens from "../regimens";
import assignedRegimens from "./assignedRegimens";

const CollapsibleSection = ({ title, count, children }: any) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.countText}>{count}</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </View>
      </TouchableOpacity>
      {expanded && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
};

export default function RegimenDetailView({
  regimenId,
}: {
  regimenId: number;
}) {
  const regimen = regimens.find((r) => r.id === regimenId);

  // Logic to filter athletes based on assignedRegimens table
  const assignments = assignedRegimens.filter(
    (ar) => ar.regimenId === regimenId
  );

  const assignedAthletes = athlete_list.filter((a) =>
    assignments.some((ar) => ar.assignedAthleteId === a.athlete_no)
  );
  const notAssignedAthletes = athlete_list.filter(
    (a) => !assignments.some((ar) => ar.assignedAthleteId === a.athlete_no)
  );

  const doneAthletes = athlete_list.filter((a) =>
    assignments.some(
      (ar) =>
        ar.assignedAthleteId === a.athlete_no &&
        ar.regimenStatus === "completed"
    )
  );

  const missedAthletes = athlete_list.filter((a) =>
    assignments.some(
      (ar) =>
        ar.assignedAthleteId === a.athlete_no && ar.regimenStatus === "missed"
    )
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.headerPadding}>
        <Text style={styles.mainTitle}>{regimen?.name}</Text>
        <Text style={styles.subTitle}>Due: {regimen?.due_date}</Text>
      </View>

      <CollapsibleSection title="Assigned" count={assignedAthletes.length}>
        {assignedAthletes.map((a) => (
          <Text key={a.athlete_no} style={styles.item}>
            {a.first_name} {a.last_name}
          </Text>
        ))}
      </CollapsibleSection>

      <CollapsibleSection
        title="Not Assigned"
        count={notAssignedAthletes.length}
      >
        {notAssignedAthletes.map((a) => (
          <Text key={a.athlete_no} style={styles.item}>
            {a.first_name} {a.last_name}
          </Text>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Missed" count={missedAthletes.length}>
        {missedAthletes.map((a) => (
          <Text key={a.athlete_no} style={styles.item}>
            {a.first_name} {a.last_name}
          </Text>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Done" count={doneAthletes.length}>
        {doneAthletes.map((a) => (
          <Text key={a.athlete_no} style={styles.item}>
            {a.first_name} {a.last_name}
          </Text>
        ))}
      </CollapsibleSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerPadding: { padding: 20, backgroundColor: "#fff", marginBottom: 10 },
  mainTitle: { fontSize: 22, fontWeight: "bold" },
  subTitle: { color: "#666", marginTop: 4 },
  sectionContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "500" },
  sectionBody: { padding: 16, backgroundColor: "#fafafa" },
  countText: { marginRight: 10, color: "#666" },
  item: { paddingVertical: 4, color: "#444" },
});
