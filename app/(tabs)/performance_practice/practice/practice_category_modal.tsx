// app/performance_practice/practice/practice_category_modal.tsx
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

interface PracticeCategoryModalProps {
  name: string;
  description: string;
  practiceId: number; // Pass the ID to the modal
  onEdit: (id: number) => void; // Callback for edit
  onDelete: (id: number, name: string) => void; // Callback for delete
}

export default function PracticeCategoryModal({
  name,
  description,
  practiceId,
  onEdit,
  onDelete,
}: PracticeCategoryModalProps) {
  return (
    <View style={styles.container}>
      {/* Action buttons are absolutely positioned on top */}
      <View style={styles.actionButtonsContainer}>
        <Pressable
          onPress={() => onEdit(practiceId)}
          style={[styles.actionButton, styles.editButton]}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => onDelete(practiceId, name)}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </Pressable>
      </View>

      <View style={styles.text_container}>
        <Text style={styles.practice_name}>{name}</Text>
        <Text
          style={styles.practice_description}
          numberOfLines={6}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    width: screenWidth * 0.9,
    minHeight: screenHeight * 0.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    paddingBottom: 20,
    paddingTop: 10,
    overflow: "hidden", // Ensures nothing (like shadow from buttons) leaks outside rounded corners
    flexDirection: "column", // Arrange children vertically
    justifyContent: "flex-end", // Push content to the bottom
  },
  text_container: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 0,
    marginTop: "auto",
  },
  practice_name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  practice_description: {
    fontSize: 14,
    opacity: 0.8,
  },
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
