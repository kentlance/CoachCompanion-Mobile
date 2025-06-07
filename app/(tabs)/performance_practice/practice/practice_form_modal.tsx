// app/performance_practice/practice/practice_form_modal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

interface PracticeFormModalProps {
  visible: boolean;
  onClose: () => void;
  // onSave now accepts an optional 'id' for editing
  onSave: (id: number | null, name: string, description: string) => void;
  initialPractice?: { id: number; name: string; description: string } | null; // Optional prop for initial data
}

const PracticeFormModal: React.FC<PracticeFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialPractice,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentId, setCurrentId] = useState<number | null>(null);

  // Effect to populate form fields when initialPractice changes (when editing)
  useEffect(() => {
    if (initialPractice) {
      setName(initialPractice.name);
      setDescription(initialPractice.description);
      setCurrentId(initialPractice.id);
    } else {
      // Clear fields when modal is opened for adding a new item
      setName("");
      setDescription("");
      setCurrentId(null);
    }
  }, [initialPractice, visible]); // Depend on initialPractice and visible to reset when modal opens for new item

  const handleSave = () => {
    if (name.trim() === "") {
      alert("Practice name cannot be empty.");
      return;
    }
    // Pass currentId (null for new, actual ID for edit)
    onSave(currentId, name.trim(), description.trim());
    onClose(); // Close modal after saving
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setCurrentId(null);
    onClose();
  };

  const modalTitle = initialPractice
    ? "Edit Practice Category"
    : "Add New Practice Category";
  const saveButtonText = initialPractice ? "Update" : "Add";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>

          <TextInput
            style={styles.input}
            placeholder="Practice Name"
            value={name}
            onChangeText={setName}
            maxLength={50}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={200}
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
              <Text style={styles.textStyle}>{saveButtonText}</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
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
    width: width * 0.9,
    maxWidth: 400,
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
    height: 80,
    textAlignVertical: "top",
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
    backgroundColor: "#EC1D25", // Using your app's red accent color
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default PracticeFormModal;
