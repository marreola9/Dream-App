// src/screens/AddDreamScreen.js

import React, { useState } from "react";
import {
  SafeAreaView, // ensures content isn't hidden by notches/status bars
  TextInput, // for user input fields
  Button, // submit button
  StyleSheet, // styling utility
  Alert, // for popup messages
  View, // generic container
} from "react-native";
import api from "../api"; // our API helper for HTTP requests

export default function AddDreamScreen({ navigation }) {
  // form state hooks for each input field
  const [title, setTitle] = useState("");
  const [climax, setClimax] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [emotion, setEmotion] = useState("");
  const [people, setPeople] = useState(""); // comma‑separated list
  const [objects, setObjects] = useState(""); // comma‑separated list
  const [notes, setNotes] = useState("");

  // Called when the user taps "Save Dream"
  const handleSave = async () => {
    // basic validation: title is required
    if (!title.trim()) {
      return Alert.alert("Validation Error", "Title is required");
    }
    try {
      // send POST request with all form data
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
      // show success message
      Alert.alert("Success", "Dream saved!");
      // navigate back to the list of dreams
      navigation.navigate("Dreams");
    } catch (err) {
      // display any API errors
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title input */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      {/* Climax input (main moment of the dream) */}
      <TextInput
        placeholder="Climax"
        value={climax}
        onChangeText={setClimax}
        style={styles.input}
      />
      {/* Location input */}
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      {/* Time input */}
      <TextInput
        placeholder="Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      {/* Emotion input */}
      <TextInput
        placeholder="Emotion"
        value={emotion}
        onChangeText={setEmotion}
        style={styles.input}
      />
      {/* People involved (comma-separated) */}
      <TextInput
        placeholder="People (comma‑separated)"
        value={people}
        onChangeText={setPeople}
        style={styles.input}
      />
      {/* Objects present (comma-separated) */}
      <TextInput
        placeholder="Objects (comma‑separated)"
        value={objects}
        onChangeText={setObjects}
        style={styles.input}
      />
      {/* Additional notes */}
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      {/* Save button */}
      <View style={styles.buttonWrapper}>
        <Button title="Save Dream" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // fill the entire screen
    padding: 16, // inner spacing
    backgroundColor: "#045E95",
  },
  input: {
    borderWidth: 1, // visible border
    borderColor: "#ccc", // light gray color
    padding: 12, // input padding
    marginBottom: 12, // spacing between fields
    borderRadius: 6, // rounded corners
    color: "#fff",
  },
  buttonWrapper: {
    marginTop: 8, // space above the button
  },
});
