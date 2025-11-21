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
  const [duration, setDuration] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedAthletes, setAssignedAthletes] = useState<string[]>([""]);
  const [focus, setFocus] = useState<string[]>([""]);
  // add algorithm that chooses drills
  const [drills, setDrills] = useState<string[]>([""]);

  // date
  const [date, setDate] = useState(new Date());
  // if picking date or time
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);
  // if to show date picker
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [drillLimit, setDrillLimit] = useState("3"); // default to 3 drills

  // for focus selection
  const [selectedCategory, setSelectedCategory] =
    useState<string>("athleteSpecific"); // Default selection
  const [selectedPractices, setSelectedPractices] = useState<number[]>([]); // Default selection

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

        // Optional: enforce minimum datetime
        if (updatedDateTime >= new Date()) {
          setDate(updatedDateTime);
        }
      }
    }
  };

  const openPicker = (mode: "date" | "time") => {
    setPickerMode(mode);
    setPickerVisible(true);
  };

  // first get list of all athletes from database

  const modalTitle = initialDrill ? "Edit Regimen" : "Generate Regimen";
  const saveButtonText = initialDrill ? "Update" : "Add";

  const [selectedAthletes, setSelectedAthletes] = useState<string[]>(["All"]); // Default selection
  const [assignmentType, setAssignmentType] = useState("all");

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
            <Text style={modalFormStyles.label}>Training Regimen Name</Text>
            <TextInput
              style={modalFormStyles.input}
              value={name}
              onChangeText={setName}
              maxLength={50}
            />

            <Text style={modalFormStyles.label}>Duration</Text>
            <TextInput
              style={[modalFormStyles.input, modalFormStyles.textArea]}
              inputMode="numeric"
              placeholder="In minutes"
              maxLength={50}
            />

            <View style={modalFormStyles.section}>
              <View style={modalFormStyles.sectionHeader}>
                <Text style={modalFormStyles.label}>Due Date</Text>
              </View>
              <Pressable
                onPress={startDateTimeSelection}
                style={modalFormStyles.input_text}
              >
                <Text>{date.toLocaleString()}</Text>
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
            </View>

            <Text style={modalFormStyles.label}>Assign to: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Pressable onPress={() => setAssignmentType("all")}>
                <Text style={{ marginRight: 10 }}>All</Text>
              </Pressable>
              <Checkbox
                value={assignmentType === "all"}
                onValueChange={() => setAssignmentType("all")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Pressable onPress={() => setAssignmentType("positions")}>
                <Text style={{ marginRight: 10 }}>Positions</Text>
              </Pressable>
              <Checkbox
                value={assignmentType === "positions"}
                onValueChange={() => setAssignmentType("positions")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Pressable onPress={() => setAssignmentType("custom")}>
                <Text style={{ marginRight: 10, paddingBottom: 10 }}>
                  Custom
                </Text>
              </Pressable>
              <Checkbox
                value={assignmentType === "custom"}
                onValueChange={() => setAssignmentType("custom")}
              />
            </View>

            {assignmentType === "positions" && (
              <View>
                {Array.from(
                  new Set(athleteList.map((athlete) => athlete.position))
                ).map((position: string) => (
                  <Pressable
                    key={position}
                    style={modalFormStyles.listItem}
                    onPress={() => handleCheckboxChange(position)}
                  >
                    <Text style={modalFormStyles.listItemText}>{position}</Text>
                    <Checkbox
                      value={selectedAthletes.includes(position)}
                      onValueChange={() => handleCheckboxChange(position)}
                    />
                  </Pressable>
                ))}
              </View>
            )}

            {assignmentType === "custom" && (
              <View style={{ paddingBottom: 10 }}>
                {athleteList.map((athlete: Athlete) => (
                  <Pressable
                    key={athlete.athlete_no}
                    style={modalFormStyles.listItem}
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
                    />
                  </Pressable>
                ))}
              </View>
            )}
            <Text style={modalFormStyles.label}>Focus:</Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Pressable
                  onPress={() => handleCategoryChange("athleteSpecific")}
                >
                  <Text style={{ marginRight: 10 }}>Athlete Specific</Text>
                </Pressable>
                <Checkbox
                  value={selectedCategory === "athleteSpecific"}
                  onValueChange={() => handleCategoryChange("athleteSpecific")}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Pressable
                  onPress={() => handleCategoryChange("practiceCategories")}
                >
                  <Text style={{ marginRight: 10, paddingBottom: 10 }}>
                    Practice Categories
                  </Text>
                </Pressable>
                <Checkbox
                  value={selectedCategory === "practiceCategories"}
                  onValueChange={() =>
                    handleCategoryChange("practiceCategories")
                  }
                />
              </View>
            </View>

            {selectedCategory === "practiceCategories" && (
              <View>
                {practices_list.map((practices_list) => (
                  <Pressable
                    key={practices_list.id}
                    style={modalFormStyles.listItem}
                    onPress={() => togglePracticeSelection(practices_list.id)}
                  >
                    <Text style={modalFormStyles.listItemText}>
                      {practices_list.name}
                    </Text>
                    <Checkbox
                      value={selectedPractices.includes(practices_list.id)}
                      onValueChange={() =>
                        togglePracticeSelection(practices_list.id)
                      }
                    />
                  </Pressable>
                ))}
                {selectedPractices.length >= 3 && (
                  <Text style={{ color: "red" }}>
                    You can select up to 3 categories only.
                  </Text>
                )}
              </View>
            )}
          </ScrollView>

          <Text style={modalFormStyles.label}>
            Limit drills assigned to one athlete up to:
          </Text>
          <TextInput
            style={modalFormStyles.input}
            value={drillLimit}
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              if (!isNaN(num) && num >= 1 && num <= 6) {
                setDrillLimit(text);
              } else if (text === "") {
                setDrillLimit("");
              }
            }}
            inputMode="numeric"
            placeholder="Enter a number between 1 and 6"
            maxLength={1}
          />
          {(drillLimit === "" ||
            parseInt(drillLimit) < 1 ||
            parseInt(drillLimit) > 6) && (
            <Text style={{ color: "red" }}>
              Please enter a number from 1 to 6.
            </Text>
          )}

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
