// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="performance_practice"
        options={{ headerShown: false, title: "Performance and Practice" }}
      />
    </Tabs>
  );
}
