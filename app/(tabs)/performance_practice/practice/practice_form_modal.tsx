// app/performance_practice/practice/practice_form_modal.tsx
import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import modalFormStyles from "./modalFormStyles";

interface PracticeFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (
    id: number | null,
    name: string,
    description: string,
    skill: string
  ) => void;
  initialPractice?: {
    id: number;
    name: string;
    description: string;
    skill: string[];
  } | null;
  existingPractices?: { id: number; skill: string[] }[];
}

const PracticeFormModal: React.FC<PracticeFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialPractice,
  existingPractices = [],
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [showSkillWarning, setShowSkillWarning] = useState(false);

  // Effect to populate form fields when initialPractice changes (when editing)
  useEffect(() => {
    if (initialPractice) {
      setName(initialPractice.name);
      setDescription(initialPractice.description);
      setSkill(initialPractice.skill[0] || "");
      setCurrentId(initialPractice.id);
    } else {
      // Clear fields when modal is opened for adding a new item
      setName("");
      setDescription("");
      setSkill("");
      setCurrentId(null);
    }
    setShowSkillWarning(false);
  }, [initialPractice, visible]);

  const handleSave = () => {
    if (name.trim() === "") {
      Alert.alert("Error", "Practice name cannot be empty.");
      return;
    }

    if (skill.trim() === "") {
      Alert.alert("Error", "Please specify a skill for this practice.");
      return;
    }

    // Check if skill is already used by another practice
    const isSkillUsed = existingPractices.some(
      (practice) =>
        practice.id !== currentId &&
        practice.skill.some(
          (s) => s.toLowerCase() === skill.trim().toLowerCase()
        )
    );

    if (isSkillUsed) {
      setShowSkillWarning(true);
      return;
    }

    onSave(
      currentId,
      name.trim(),
      description.trim(),
      skill.trim().toLowerCase()
    );
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setSkill("");
    setCurrentId(null);
    setShowSkillWarning(false);
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
      <View style={modalFormStyles.centeredView}>
        <View style={modalFormStyles.modalView}>
          <Text style={modalFormStyles.modalTitle}>{modalTitle}</Text>

          <Text style={modalFormStyles.label}>Practice Name</Text>
          <TextInput
            style={modalFormStyles.input}
            placeholder="e.g., Shooting Practice"
            value={name}
            onChangeText={setName}
            maxLength={50}
          />

          <Text style={modalFormStyles.label}>Skill</Text>
          <TextInput
            style={modalFormStyles.input}
            placeholder="e.g., shooting, passing"
            value={skill}
            onChangeText={(text) => {
              setSkill(text);
              setShowSkillWarning(false);
            }}
            maxLength={30}
          />
          {showSkillWarning && (
            <Text style={styles.warningText}>
              Warning: This skill is already used by another practice.
            </Text>
          )}

          <Text style={modalFormStyles.label}>Description (Optional)</Text>
          <TextInput
            style={[modalFormStyles.input, modalFormStyles.textArea]}
            placeholder="Describe the practice category..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={200}
          />

          <View style={modalFormStyles.buttonContainer}>
            <Pressable
              style={[modalFormStyles.button, modalFormStyles.buttonCancel]}
              onPress={handleClose}
            >
              <Text style={[modalFormStyles.buttonText, { color: "#000" }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={[modalFormStyles.button, modalFormStyles.buttonSave]}
              onPress={handleSave}
            >
              <Text style={modalFormStyles.buttonText}>{saveButtonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  warningText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
} as const;

export default PracticeFormModal;
