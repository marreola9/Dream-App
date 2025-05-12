import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import api from "../api"; // our API helper for HTTP requests
import { addDreamStyles as styles } from "./ScreenStyles"; // Import styles
import bgpic from "../../assets/bgpic.png"; // Import the background image

export default function AddDreamScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [climax, setClimax] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [emotion, setEmotion] = useState("");
  const [people, setPeople] = useState("");
  const [objects, setObjects] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      return Alert.alert("Validation Error", "Title is required");
    }
    try {
      await api.post("/dreams", {
        title,
        climax,
        location,
        time,
        emotion,
        people: people
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        objects: objects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        notes,
      });
      Alert.alert("Success", "Dream saved!");
      navigation.navigate("Dreams");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={bgpic}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.containerOverlay}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>Add A New Dream</Text>

            <Text style={styles.label}>Title:</Text>
            <TextInput
              placeholder="Enter dream title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Climax:</Text>
            <TextInput
              placeholder="Enter dream climax"
              value={climax}
              onChangeText={setClimax}
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Location:</Text>
            <TextInput
              placeholder="Enter dream location"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Time:</Text>
            <TextInput
              placeholder="Enter dream time"
              value={time}
              onChangeText={setTime}
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Emotion:</Text>
            <TextInput
              placeholder="Enter dream emotion"
              value={emotion}
              onChangeText={setEmotion}
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>People (comma-separated):</Text>
            <TextInput
              placeholder="e.g. Alice, Bob"
              value={people}
              onChangeText={setPeople}
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Objects (comma-separated):</Text>
            <TextInput
              placeholder="e.g. Key, Book"
              value={objects}
              onChangeText={setObjects}
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Notes:</Text>
            <TextInput
              placeholder="Any additional notes..."
              value={notes}
              onChangeText={setNotes}
              style={[styles.input, { height: 80 }]}
              multiline
              placeholderTextColor="#ccc"
            />

            <View style={styles.buttonWrapper}>
              <Button title="Save Dream" onPress={handleSave} />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
