// show regimen (for coach view, list all regimens)

import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

interface RegimenItem {
  id: number;
  name: string;
  duration: number;
  due_date: string;
  focus: string | { type: string; category: string };
  limitDrills: number;
  assigned_athletes: { [key: string]: boolean | undefined };
}

interface RegimenCardProps {
  item: RegimenItem;
  // Placeholder for future actions
  onEdit: (id: number) => void;
  onDelete: (id: number, name: string) => void;
}

// Get screen dimensions for consistent card width
const screenWidth = Dimensions.get("window").width;

const RegimenCard: React.FC<RegimenCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const focusText =
    typeof item.focus === "string"
      ? item.focus
      : `${item.focus.type} - ${item.focus.category}`;

  return (
    <View style={styles.container}>
      {/* Action buttons section (similar to PracticeCategoryModal) */}
      <View style={styles.actionButtonsContainer}>
        {/* Placeholder for Edit */}
        <Pressable
          onPress={() => onEdit(item.id)}
          style={[styles.actionButton, styles.editButton]}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </Pressable>
        {/* Placeholder for Delete */}
        <Pressable
          onPress={() => onDelete(item.id, item.name)}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </Pressable>
      </View>

      {/* Main content container */}
      <View style={styles.text_container}>
        <Text style={styles.regimen_name}>{item.name}</Text>
        <Text>Duration: {item.duration} mins</Text>
        <Text>Due: {item.due_date}</Text>
        <Text>Focus: {focusText}</Text>
        <Text>Drill Limit: {item.limitDrills}</Text>
        <Text>
          Assigned Athletes: {Object.keys(item.assigned_athletes).join(", ")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Adopted from PracticeCategoryModal styles
    backgroundColor: "white",
    borderRadius: 20,
    width: screenWidth * 0.9,
    alignSelf: "center", // Center the card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    paddingBottom: 20, // Add space at the bottom for content
    paddingTop: 10,
    overflow: "hidden",
    marginBottom: 15, // Space between cards
  },
  text_container: {
    marginLeft: 20,
    marginRight: 20, // Increased margin to prevent overlap with buttons
    marginTop: 10,
  },
  regimen_name: {
    fontSize: 18, // Slightly larger for the title
    fontWeight: "bold",
    marginBottom: 5,
  },
  // --- Action Button Styles (Copied/Adapted) ---
  actionButtonsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    zIndex: 1,
    backgroundColor: "transparent",
  },
  actionButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  actionButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default RegimenCard;
