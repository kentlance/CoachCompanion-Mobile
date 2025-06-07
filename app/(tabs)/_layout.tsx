// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

// Corrected relative paths for require()
const BallIcon = require("../../assets/images/bottom_nav_icons/ball.png");
const HomeIcon = require("../../assets/images/bottom_nav_icons/home.png");
const JerseyIcon = require("../../assets/images/bottom_nav_icons/jersey.png");
const MuscleIcon = require("../../assets/images/bottom_nav_icons/muscle.png");

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EC1D25", // Red color for active tab icons and labels
        tabBarInactiveTintColor: "black", // Black color for inactive tab icons and labels
        tabBarStyle: {
          backgroundColor: "#FFF", // White background for the tab bar
          elevation: 5, // Add shadow on Android
          shadowColor: "#000", // Add shadow on iOS
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index" // Home tab
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HomeIcon}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="jersey" // Placeholder for Jersey icon tab
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={JerseyIcon}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="muscle" // Placeholder for Muscle icon tab
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={MuscleIcon}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="performance_practice" // This is the folder containing your Practice and Performance screens
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={BallIcon}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
