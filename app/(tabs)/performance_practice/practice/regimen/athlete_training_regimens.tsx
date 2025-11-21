// this view shows regimens assigned to a specific athlete
// requires ID of athlete
// show athleteRegimens table, all assigned to that athlete

// lists regimens assigned to athlete with that ID.
// assigned, missing, done similar to google classroom

// when click on regimen, opens the assigned_regimen.tsx view

import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import regimens from "../regimens";
import AssignedRegimenModal from "./assigned_regimen";
import assignedRegimens from "./assignedRegimens";

interface AthleteTrainingRegimensProps {
  athleteId: number; // pass in the athlete ID (e.g., 2)
}

const AthleteTrainingRegimens: React.FC<AthleteTrainingRegimensProps> = ({
  athleteId,
}) => {
  // filter regimens assigned to this athlete
  const athleteRegimens = assignedRegimens.filter(
    (r) => r.assignedAthleteId === athleteId
  );

  const [selectedRegimenId, setSelectedRegimenId] = useState<number | null>(
    null
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Training Regimens</Text>

      {athleteRegimens.length === 0 ? (
        <Text style={styles.emptyText}>No regimens assigned yet.</Text>
      ) : (
        <FlatList
          data={athleteRegimens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const regimen = regimens.find((r) => r.id === item.regimenId);
            return (
              <Pressable
                style={styles.card}
                onPress={() => setSelectedRegimenId(item.id)}
              >
                <Text style={styles.cardTitle}>{regimen?.name}</Text>
                <Text>Due: {regimen?.due_date}</Text>
                <Text>Status: {item.regimenStatus}</Text>
              </Pressable>
            );
          }}
        />
      )}

      {/* Modal for detailed regimen view */}
      <Modal visible={!!selectedRegimenId} animationType="slide">
        {selectedRegimenId && (
          <AssignedRegimenModal assignedRegimenId={selectedRegimenId} />
        )}
        <Pressable
          style={styles.closeButton}
          onPress={() => setSelectedRegimenId(null)}
        >
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 32,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  closeButton: {
    padding: 12,
    backgroundColor: "#e53935",
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AthleteTrainingRegimens;
