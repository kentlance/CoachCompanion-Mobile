import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import modalFormStyles from "./modalFormStyles";

interface DrillFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (drill: {
    id: number | null;
    from_id: number;
    name: string;
    description: string;
    steps: string[];
    good_for: string[];
  }) => void;
  initialDrill?: {
    id: number;
    from_id: number;
    name: string;
    description: string;
    steps: string[];
    good_for: string[];
  } | null;
  categoryId: number;
  practices: { id: number; skill: string[] }[];
}

const DrillFormModal: React.FC<DrillFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialDrill,
  categoryId,
  practices,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<string[]>([""]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [fromId, setFromId] = useState<number>(categoryId);

  // Get the primary skill from the selected category
  const primarySkill =
    practices.find((p) => p.id === categoryId)?.skill[0] || "";

  useEffect(() => {
    if (initialDrill) {
      setName(initialDrill.name);
      setDescription(initialDrill.description);
      setSteps([...initialDrill.steps]);
      setSkills([...initialDrill.good_for]);
      setCurrentId(initialDrill.id);
      setFromId(initialDrill.from_id);
    } else {
      // Set default values for new drill
      setName("");
      setDescription("");
      setSteps([""]);
      // Pre-fill the first skill with the category's primary skill
      setSkills([primarySkill, "", ""]);
      setCurrentId(null);
    }
  }, [initialDrill, visible, categoryId, primarySkill]);

  const handleSave = () => {
    if (name.trim() === "") {
      Alert.alert("Error", "Drill name cannot be empty.");
      return;
    }

    if (steps.length === 0 || steps[0].trim() === "") {
      Alert.alert("Error", "Please add at least one step.");
      return;
    }

    const validSkills = skills.filter((skill) => skill.trim() !== "");
    if (validSkills.length === 0) {
      Alert.alert("Error", "Please add at least one skill.");
      return;
    }

    onSave({
      id: currentId,
      from_id: fromId,
      name: name.trim(),
      description: description.trim(),
      steps: steps.filter((step) => step.trim() !== ""),
      good_for: validSkills,
    });
  };

  const handleStepChange = (text: string, index: number) => {
    // Remove any existing numbers at the start of the step
    const cleanText = text.replace(/^\d+\.?\s*/, '');
    const newSteps = [...steps];
    newSteps[index] = cleanText;
    setSteps(newSteps);
  };

  const addStep = () => {
    if (steps.length < 10) {
      setSteps([...steps, ""]);
    }
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const handleSkillChange = (text: string, index: number) => {
    const newSkills = [...skills];
    newSkills[index] = text;
    setSkills(newSkills);
  };

  const addSkill = () => {
    if (skills.length < 3) {
      setSkills([...skills, ""]);
    }
  };

  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);
    }
  };

  const modalTitle = initialDrill ? "Edit Drill" : "Add New Drill";
  const saveButtonText = initialDrill ? "Update" : "Add";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalFormStyles.centeredView}>
        <View style={modalFormStyles.modalView}>
          <Text style={modalFormStyles.modalTitle}>{modalTitle}</Text>

          <ScrollView style={modalFormStyles.scrollView}>
            <Text style={modalFormStyles.label}>Drill Name</Text>
            <TextInput
              style={modalFormStyles.input}
              placeholder="e.g., Three Point Shooting"
              value={name}
              onChangeText={setName}
              maxLength={50}
            />

            <Text style={modalFormStyles.label}>Description</Text>
            <TextInput
              style={[modalFormStyles.input, modalFormStyles.textArea]}
              placeholder="Describe the drill..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              maxLength={200}
            />

            <View style={modalFormStyles.section}>
              <View style={modalFormStyles.sectionHeader}>
                <Text style={modalFormStyles.label}>Steps</Text>
                {steps.length < 10 && (
                  <Pressable
                    onPress={addStep}
                    style={modalFormStyles.addButton}
                  >
                    <Text style={modalFormStyles.addButtonText}>
                      + Add Step
                    </Text>
                  </Pressable>
                )}
              </View>
              {steps.map((step, index) => (
                <View key={index} style={modalFormStyles.stepContainer}>
                  <Text style={modalFormStyles.stepNumber}>{index + 1}.</Text>
                  <TextInput
                    style={[modalFormStyles.input, modalFormStyles.stepInput]}
                    placeholder={`Step ${index + 1}`}
                    value={step}
                    onChangeText={(text) => handleStepChange(text, index)}
                    multiline
                  />
                  {steps.length > 1 && (
                    <Pressable
                      onPress={() => removeStep(index)}
                      style={modalFormStyles.removeButton}
                    >
                      <Text style={modalFormStyles.removeButtonText}>×</Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>

            <View style={modalFormStyles.section}>
              <View style={modalFormStyles.sectionHeader}>
                <Text style={modalFormStyles.label}>Skills</Text>
                {skills.length < 3 && (
                  <Pressable
                    onPress={addSkill}
                    style={modalFormStyles.addButton}
                  >
                    <Text style={modalFormStyles.addButtonText}>
                      + Add Skill
                    </Text>
                  </Pressable>
                )}
              </View>
              {skills.map((skill, index) => (
                <View key={index} style={modalFormStyles.skillContainer}>
                  <TextInput
                    style={[modalFormStyles.input, modalFormStyles.skillInput]}
                    placeholder={`Skill ${index + 1}`}
                    value={skill}
                    onChangeText={(text) => handleSkillChange(text, index)}
                    maxLength={20}
                  />
                  {skills.length > 1 && (
                    <Pressable
                      onPress={() => removeSkill(index)}
                      style={modalFormStyles.removeButton}
                    >
                      <Text style={modalFormStyles.removeButtonText}>×</Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={modalFormStyles.buttonContainer}>
            <Pressable
              style={[modalFormStyles.button, modalFormStyles.buttonCancel]}
              onPress={onClose}
            >
              <Text style={modalFormStyles.buttonText}>Cancel</Text>
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

export default DrillFormModal;
