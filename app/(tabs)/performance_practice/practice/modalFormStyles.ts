// app/(tabs)/performance_practice/practice/modalStyles.ts
import { StyleSheet } from "react-native";

export const modalFormStyles = StyleSheet.create({
  // Common modal container styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    maxHeight: "90%",
    minHeight: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  addButton: {
    padding: 6,
  },
  addButtonText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stepNumber: {
    width: 24,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 5,
  },
  stepInput: {
    flex: 1,
    marginRight: 8,
  },
  skillContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  skillInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  removeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
    minWidth: 100,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#cdcdcdff",
  },
  buttonSave: {
    backgroundColor: "#EC1D25",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#007AFF",
    padding: 6,
    borderRadius: 12,
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default modalFormStyles;
