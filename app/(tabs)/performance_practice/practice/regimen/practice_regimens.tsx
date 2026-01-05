import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AthleteCard from "../../performance/athlete_card";
import athlete_list from "../../performance/athlete_list";
import regimens from "../regimens";
import assignedRegimens from "./assignedRegimens";
import AthletePracticeRegimens from "./athlete_practice_regimens";
import RegimenCard from "./regimen_card";
import RegimenDetailView from "./regimen_detail_view";

export default function PracticeRegimens() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Athletes" | "Regimens">(
    "Regimens"
  );
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(
    null
  );
  const [selectedRegimenId, setSelectedRegimenId] = useState<number | null>(
    null
  );

  const selectedAthlete = athlete_list.find(
    (a) => a.athlete_no === selectedAthleteId
  );

  const handleHeaderBack = () => {
    if (selectedAthleteId !== null) setSelectedAthleteId(null);
    else if (selectedRegimenId !== null) setSelectedRegimenId(null);
    else router.back();
  };
  const handleDelete = (id: number, name: string) => {
    Alert.alert("Delete Regimen", `Are you sure you want to delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Deleted", id),
      },
    ]);
  };

  // 2. Updated Edit handler with 'isEditing' flag
  const handleEditRegimen = (regimen: any) => {
    const drillAssignments: Record<number, number[]> = {};

    // Find all assignments linked to this specific regimen ID
    const linkedAssignments = assignedRegimens.filter(
      (ar) => ar.regimenId === regimen.id
    );

    if (linkedAssignments.length > 0) {
      // If we have specific assignments in Table 2, use those
      linkedAssignments.forEach((assignment) => {
        drillAssignments[assignment.assignedAthleteId] =
          assignment.assignedDrillsId;
      });
    } else {
      // Fallback: If no specific assignments exist yet, initialize
      // the athletes from the regimen object with an empty array
      Object.keys(regimen.assigned_athletes).forEach((id) => {
        drillAssignments[parseInt(id)] = [];
      });
    }

    const regimenData = {
      id: regimen.id,
      name: regimen.name,
      drillAssignments: drillAssignments,
      isEditing: true,
    };

    router.push({
      pathname: "/performance_practice/practice/edit_regimen_screen",
      params: { regimenData: JSON.stringify(regimenData) },
    });
  };
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.manualHeader}>
        <TouchableOpacity
          onPress={handleHeaderBack}
          style={styles.backButton}
          activeOpacity={1}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedAthleteId
            ? `${selectedAthlete?.first_name}'s Regimens`
            : selectedRegimenId
            ? "Regimen Details"
            : "Practice Regimens"}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Main Content Logic */}
      {!selectedAthleteId && !selectedRegimenId ? (
        <View style={styles.fullFlex}>
          {/* Tab Switcher */}
          <View style={styles.tabBar}>
            {["Regimens", "Athletes"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as any)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                activeOpacity={1}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {activeTab === "Athletes" ? (
              <View style={styles.grid}>
                {athlete_list.map((athlete) => (
                  <AthleteCard
                    key={athlete.athlete_no}
                    athlete={athlete}
                    onPress={() => setSelectedAthleteId(athlete.athlete_no)}
                  />
                ))}
              </View>
            ) : (
              <View>
                {regimens.map((regimenItem) => (
                  <TouchableOpacity
                    key={regimenItem.id}
                    onPress={() => setSelectedRegimenId(regimenItem.id)}
                    activeOpacity={1}
                  >
                    <RegimenCard
                      item={regimenItem}
                      onEdit={() => handleEditRegimen(regimenItem)}
                      onDelete={(id, name) => handleDelete(id, name)}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      ) : selectedAthleteId ? (
        <AthletePracticeRegimens
          athleteId={selectedAthleteId}
          athleteName={`${selectedAthlete?.first_name} ${selectedAthlete?.last_name}`}
        />
      ) : (
        <RegimenDetailView regimenId={selectedRegimenId!} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  manualHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  backButton: { padding: 4 },
  fullFlex: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 8 },
  activeTab: { backgroundColor: "#007AFF" },
  tabText: { fontWeight: "600", color: "#666" },
  activeTabText: { color: "#fff" },
  scrollContent: { padding: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
