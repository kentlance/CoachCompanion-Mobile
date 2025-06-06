import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  // TouchableOpacity, // REMOVE THIS IMPORT
  View,
} from "react-native";

interface PracticeCategoryModalProps {
  name: string;
  description: string;
}

export default function PracticeCategoryModal({
  name,
  description,
}: PracticeCategoryModalProps) {
  return (
    <View>
      <View style={styles.container}>
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
    justifyContent: "flex-end",
    marginBottom: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text_container: {
    marginLeft: 20,
    marginBottom: 20,
  },
  practice_name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  practice_description: {
    fontSize: 14,
    opacity: 0.8,
  },
});
