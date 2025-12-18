import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import React, { useState } from "react";

import { Checkbox } from "expo-checkbox";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import athleteList from "../performance/athlete_list";
import { Athlete } from "../performance/interfaces";
import { modalFormStyles } from "./modalFormStyles";
import practices_list from "./practices";

interface RegimenFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (drill: {
    id: number | null;
    name: string;
    duration: string;
    due_date: string;
    assigned_athletes: string[];
    focus: string[];
    drills: string[];
  }) => void;
  initialRegimen?: {
    id: number;
    name: string;
    duration: string;
    due_date: string;
    assigned_athletes: string[];
    focus: string[];
    drills: string[];
  } | null;
}

const RegimenFormModal: React.FC<RegimenFormModalProps> = ({
  visible,
  onClose,
  onSave,
  initialRegimen: initialDrill,
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [drillLimit, setDrillLimit] = useState("3");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("athleteSpecific");
  const [selectedPractices, setSelectedPractices] = useState<number[]>([]);
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>(["All"]);
  const [assignmentType, setAssignmentType] = useState("all");

  const startDateTimeSelection = () => {
    setPickerMode("date");
    setPickerVisible(true);
  };

  const handleSave = () => {
    // check if fields are empty
    // then for loop of choosing drills algorithm for each assigned athlete
  };
  const handlePickerChange = (event: DateTimePickerEvent, value?: Date) => {
    setPickerVisible(false);

    if (event.type === "set" && value) {
      if (pickerMode === "date") {
        const selectedDate = new Date(value);
        setDate(selectedDate);
        setPickerMode("time");
        setPickerVisible(true);
      } else if (pickerMode === "time") {
        const updatedDateTime = new Date(date);
        updatedDateTime.setHours(value.getHours());
        updatedDateTime.setMinutes(value.getMinutes());
        if (updatedDateTime >= new Date()) {
          setDate(updatedDateTime);
        }
      }
    }
  };

  const handleCheckboxChange = (athleteId: string) => {
    setSelectedAthletes((prevSelected) => {
      if (prevSelected.includes(athleteId)) {
        return prevSelected.filter((id) => id !== athleteId);
      } else {
        return [...prevSelected, athleteId];
      }
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "athleteSpecific") {
      setSelectedPractices([]); // Reset selected practices when switching to athlete specific
    }
  };

  const togglePracticeSelection = (practice: number) => {
    if (selectedPractices.includes(practice)) {
      // Remove practice if already selected
      setSelectedPractices((prevSelected) =>
        prevSelected.filter((item) => item !== practice)
      );
    } else {
      // Limit selection to a maximum of 3
      if (selectedPractices.length < 3) {
        setSelectedPractices((prevSelected) => [...prevSelected, practice]);
      }
    }
  };

  const modalTitle = initialDrill ? "Edit Regimen" : "Generate Regimen";
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

          <ScrollView
            style={modalFormStyles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <Text style={modalFormStyles.label}>Training Regimen Name</Text>
            <TextInput
              style={modalFormStyles.input}
              value={name}
              onChangeText={setName}
              maxLength={50}
            />

            <View style={modalFormStyles.separator} />

            <Text style={modalFormStyles.label}>Duration</Text>
            <TextInput
              style={[modalFormStyles.input, modalFormStyles.textArea]}
              inputMode="numeric"
              placeholder="In minutes"
              maxLength={50}
            />

            <View style={modalFormStyles.separator} />
            <Text style={modalFormStyles.label}>Due Date</Text>
            <Pressable
              onPress={startDateTimeSelection}
              style={modalFormStyles.input_text}
            >
              <Text style={{ color: "#333" }}>{date.toLocaleString()}</Text>
            </Pressable>

            {isPickerVisible && pickerMode && (
              <DateTimePicker
                value={date}
                mode={pickerMode}
                display="default"
                minimumDate={new Date()}
                is24Hour={false}
                onChange={handlePickerChange}
              />
            )}

            <View style={modalFormStyles.separator} />

            <Text style={modalFormStyles.label}>Assign to:</Text>

            <Pressable
              style={modalFormStyles.radioGroup}
              onPress={() => setAssignmentType("all")}
            >
              <Text style={modalFormStyles.listItemText}>All Athletes</Text>
              <Checkbox
                value={assignmentType === "all"}
                onValueChange={() => setAssignmentType("all")}
                color="#EC1D25"
              />
            </Pressable>

            <Pressable
              style={modalFormStyles.radioGroup}
              onPress={() => setAssignmentType("positions")}
            >
              <Text style={modalFormStyles.listItemText}>By Positions</Text>
              <Checkbox
                value={assignmentType === "positions"}
                onValueChange={() => setAssignmentType("positions")}
                color="#EC1D25"
              />
            </Pressable>

            <Pressable
              style={modalFormStyles.radioGroup}
              onPress={() => setAssignmentType("custom")}
            >
              <Text style={modalFormStyles.listItemText}>Custom Selection</Text>
              <Checkbox
                value={assignmentType === "custom"}
                onValueChange={() => setAssignmentType("custom")}
                color="#EC1D25"
              />
            </Pressable>

            {assignmentType === "positions" && (
              <View style={{ marginTop: 10 }}>
                {Array.from(new Set(athleteList.map((a) => a.position))).map(
                  (position) => (
                    <Pressable
                      key={position}
                      style={[
                        modalFormStyles.listItem,
                        selectedAthletes.includes(position) &&
                          modalFormStyles.selectedListItem,
                      ]}
                      onPress={() => handleCheckboxChange(position)}
                    >
                      <Text style={modalFormStyles.listItemText}>
                        {position}
                      </Text>
                      <Checkbox
                        value={selectedAthletes.includes(position)}
                        onValueChange={() => handleCheckboxChange(position)}
                        color="#EC1D25"
                      />
                    </Pressable>
                  )
                )}
              </View>
            )}

            {assignmentType === "custom" && (
              <View style={{ marginTop: 10 }}>
                {athleteList.map((athlete: Athlete) => (
                  <Pressable
                    key={athlete.athlete_no}
                    style={[
                      modalFormStyles.listItem,
                      selectedAthletes.includes(
                        athlete.athlete_no.toString()
                      ) && modalFormStyles.selectedListItem,
                    ]}
                    onPress={() =>
                      handleCheckboxChange(athlete.athlete_no.toString())
                    }
                  >
                    <Text
                      style={modalFormStyles.listItemText}
                    >{`${athlete.first_name} ${athlete.last_name} (${athlete.position})`}</Text>
                    <Checkbox
                      value={selectedAthletes.includes(
                        athlete.athlete_no.toString()
                      )}
                      onValueChange={() =>
                        handleCheckboxChange(athlete.athlete_no.toString())
                      }
                      color="#EC1D25"
                    />
                  </Pressable>
                ))}
              </View>
            )}

            <View style={modalFormStyles.separator} />

            <Text style={modalFormStyles.label}>Focus Area:</Text>
            <Pressable
              style={modalFormStyles.radioGroup}
              onPress={() => handleCategoryChange("athleteSpecific")}
            >
              <Text style={modalFormStyles.listItemText}>Athlete Specific</Text>
              <Checkbox
                value={selectedCategory === "athleteSpecific"}
                onValueChange={() => handleCategoryChange("athleteSpecific")}
                color="#EC1D25"
              />
            </Pressable>

            <Pressable
              style={modalFormStyles.radioGroup}
              onPress={() => handleCategoryChange("practiceCategories")}
            >
              <Text style={modalFormStyles.listItemText}>
                Practice Categories
              </Text>
              <Checkbox
                value={selectedCategory === "practiceCategories"}
                onValueChange={() => handleCategoryChange("practiceCategories")}
                color="#EC1D25"
              />
            </Pressable>

            {selectedCategory === "practiceCategories" && (
              <View style={{ marginTop: 10 }}>
                {practices_list.map((practice) => (
                  <Pressable
                    key={practice.id}
                    style={[
                      modalFormStyles.listItem,
                      selectedPractices.includes(practice.id) &&
                        modalFormStyles.selectedListItem,
                    ]}
                    onPress={() => togglePracticeSelection(practice.id)}
                  >
                    <Text style={modalFormStyles.listItemText}>
                      {practice.name}
                    </Text>
                    <Checkbox
                      value={selectedPractices.includes(practice.id)}
                      onValueChange={() => togglePracticeSelection(practice.id)}
                      color="#EC1D25"
                    />
                  </Pressable>
                ))}
                {selectedPractices.length >= 3 && (
                  <Text
                    style={{ color: "#EC1D25", fontSize: 12, marginTop: 5 }}
                  >
                    You can select up to 3 categories only.
                  </Text>
                )}
              </View>
            )}

            <View style={modalFormStyles.separator} />

            <Text style={modalFormStyles.label}>Max Drills Per Athlete</Text>
            <TextInput
              style={modalFormStyles.input}
              value={drillLimit}
              onChangeText={setDrillLimit}
              inputMode="numeric"
              placeholder="1-6"
              maxLength={1}
            />
          </ScrollView>

          <View style={modalFormStyles.buttonContainer}>
            <Pressable
              style={[modalFormStyles.button, modalFormStyles.buttonCancel]}
              onPress={onClose}
            >
              <Text style={[modalFormStyles.buttonText, { color: "#666" }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={[modalFormStyles.button, modalFormStyles.buttonSave]}
              onPress={handleSave}
            >
              {/** On press, check if all fields are filled. Then, generate drills using algorithm for each assigned athlete
               * Then save regimen to database, move to Athlete Training Regimens page to show the newly created regimen
               *
               * create new Regimen entry
               * create new AthleteRegimen entry for each athlete assigned
               * Algorithm will give at most 6 drills, slice for drillLimit
               * */}
              <Text style={modalFormStyles.buttonText}>{saveButtonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RegimenFormModal;
