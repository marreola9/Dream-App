// Frontend/App.js
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import "react-native-reanimated";

import DreamsScreen from "./src/screens/DreamsScreen";
import AddDreamScreen from "./src/screens/AddDreamScreen";
import AddStoryScreen from "./src/screens/AddStoryScreen"; // ← import!
import StoriesScreen from "./src/screens/StoriesScreen";
import EditDreamScreen from "./src/screens/EditDreamScreen";
import PingScreen from "./src/screens/PingScreen"; // New test screen

import { View, Button, Alert } from "react-native";

import { BASE_URL } from "./src/api"; // or wherever your api.js is

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (route.name === "Dreams")
            iconName = focused ? "book" : "book-outline";
          if (route.name === "Add Dream")
            iconName = focused ? "add-circle" : "add-circle-outline";
          if (route.name === "Add Story")
            iconName = focused ? "create" : "create-outline";
          if (route.name === "Stories")
            iconName = focused ? "list" : "list-outline";
          if (route.name === "Ping Test")
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dreams" component={DreamsScreen} />
      <Tab.Screen name="Add Dream" component={AddDreamScreen} />
      <Tab.Screen name="Add Story" component={AddStoryScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Ping Test" component={PingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Edit Dream" component={EditDreamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
