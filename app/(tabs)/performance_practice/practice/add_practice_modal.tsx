// app/performance_practice/practice/add_practice_modal.tsx
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface AddPracticeModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

const AddPracticeModal: React.FC<AddPracticeModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (name.trim() === "") {
      alert("Practice name cannot be empty."); // Use a simple alert for validation
      return;
    }
    onSave(name.trim(), description.trim());
    setName(""); // Clear inputs after saving
    setDescription("");
  };

  const handleClose = () => {
    setName(""); // Clear inputs on close without saving
    setDescription("");
    onClose();
  };

  return (
    <Modal
      animationType="fade" // or "slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose} // Handles Android back button
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Practice Category</Text>

          <TextInput
            style={styles.input}
            placeholder="Practice Name"
            value={name}
            onChangeText={setName}
            maxLength={50} // Optional: limit input length
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            multiline // Allows multi-line input
            numberOfLines={4} // Initial number of lines
            maxLength={200} // Optional: limit input length
          />

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={handleClose}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Dim background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9, // 90% of screen width
    maxWidth: 400, // Max width for larger screens
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80, // Adjust height for multi-line description
    textAlignVertical: "top", // Align text to the top for multiline input
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: 100,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#999",
  },
  buttonSave: {
    backgroundColor: "#EC1D25",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default AddPracticeModal;
