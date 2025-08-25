import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DrillModalProps {
  drill: {
    id: number;
    name: string;
    description: string;
    steps: string[];
    good_for?: string[];
  };
  onClose: () => void;
}

export default function DrillModal({ drill, onClose }: DrillModalProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{drill.name}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>{drill.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Steps:</Text>
          {drill.steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {drill.good_for && drill.good_for.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This drill is good for:</Text>
            <View style={styles.skillsContainer}>
              {drill.good_for.map((skill, index) => {
                // Determine background color based on index
                let backgroundColor = "#e3f2fd"; // Default color
                if (index === 0) backgroundColor = "#7CEE6D";
                else if (index === 1) backgroundColor = "#D5CC84";
                else if (index === 2) backgroundColor = "#FFB790";
                
                return (
                  <View 
                    key={index} 
                    style={[
                      styles.skillTag, 
                      { backgroundColor }
                    ]}
                  >
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#444",
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  stepNumber: {
    fontWeight: "bold",
    marginRight: 8,
    color: "#666",
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  skillTag: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: "#000",
    fontSize: 14,
  },
});
