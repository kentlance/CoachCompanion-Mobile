import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import practices_list from "./practices";
import PracticeCategoryModal from "./practice_category_modal";

const Practice: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPractices = practices_list.filter((practice) =>
    practice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <SafeAreaView>
      <View style={styles.practices_container}>
        <TextInput
          style={styles.search_input}
          placeholder="Search practices"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {filteredPractices.map((practice, index) => (
          <View key={index}>
            <PracticeCategoryModal
              name={practice.name}
              description={practice.description}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
export default Practice;

const styles = StyleSheet.create({
  search_input: {
    width: "80%",
    borderRadius: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  practices_container: {
    alignItems: "center",
  },
});
