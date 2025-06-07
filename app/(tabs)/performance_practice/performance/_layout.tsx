// app/performance_practice/performance/_layout.tsx
import { Stack } from "expo-router";

export default function PerformanceLayout() {
  return (
    <Stack>
      {/* default screen for the performance tab */}
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Athlete Performance",
          headerShown: false,
        }}
      />
      {/* This defines the route for individual athlete views.
          '[athleteId]' makes the ID a dynamic parameter in the URL. */}
      <Stack.Screen
        name="[athleteId]"
        options={{
          headerTitle: "Athlete Details", // Default title, can be overridden
        }}
      />
      <Stack.Screen
        name="team_performance"
        options={{
          headerTitle: "Team Performance",
        }}
      />
    </Stack>
  );
}
