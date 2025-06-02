import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import practices_list from "./practices";
import PracticeCategoryModal from "./practice_category_modal";

export default function Practice() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.practices_container}>
        {practices_list.map((practice, index) => (
          <View key={index}>
            <PracticeCategoryModal
              name={practice.name}
              description={practice.description}
              onPress={() =>
                router.push("/performance_practice/practice/drills", {
                  id: practice.id,
                })
              }
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  practices_container: {
    alignItems: "center",
  },
});
