// src/screens/EditDreamScreen.js

import React, { useState, useEffect } from "react";
import {
  SafeAreaView, // handles device notches/status bars
  TextInput, // for text inputs
  Button, // for the save action
  StyleSheet, // styling helper
  Alert, // to show popup messages
  View, // generic container
} from "react-native";
import api, { updateDream } from "../api"; // API helper for PUT /dreams/:id

export default function EditDreamScreen({ route, navigation }) {
  const { dream } = route.params; // the dream object passed from DreamsScreen
  // state hooks for each form field
  const [title, setTitle] = useState("");
  const [climax, setClimax] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [emotion, setEmotion] = useState("");
  const [people, setPeople] = useState(""); // comma‑separated
  const [objects, setObjects] = useState(""); // comma‑separated
  const [notes, setNotes] = useState("");

  // populate form with existing dream data once on mount
  useEffect(() => {
    if (dream) {
      setTitle(dream.title);
      setClimax(dream.climax || "");
      setLocation(dream.location || "");
      setTime(dream.time || "");
      setEmotion(dream.emotion || "");
      setPeople((dream.people || []).join(", "));
      setObjects((dream.objects || []).join(", "));
      setNotes(dream.notes || "");
    }
  }, [dream]);

  // called when user taps "Save Changes"
  const handleSave = async () => {
    // basic validation: title cannot be empty
    if (!title.trim()) {
      return Alert.alert("Validation Error", "Title is required");
    }
    try {
      // send PUT request with updated fields
      await updateDream(dream._id, {
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
      Alert.alert("Success", "Dream updated!");
      navigation.navigate("Dreams"); // go back to list
    } catch (err) {
      Alert.alert("Error", err.message); // show any API error
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
      {/* Climax input */}
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
      {/* People input (comma‑separated) */}
      <TextInput
        placeholder="People (comma‑separated)"
        value={people}
        onChangeText={setPeople}
        style={styles.input}
      />
      {/* Objects input (comma‑separated) */}
      <TextInput
        placeholder="Objects (comma‑separated)"
        value={objects}
        onChangeText={setObjects}
        style={styles.input}
      />
      {/* Notes input */}
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      {/* Save Changes button */}
      <View style={styles.buttonWrapper}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#045E95" },
  input: {
    borderWidth: 1, // show border
    borderColor: "#ccc", // light gray
    padding: 12, // inner spacing
    marginBottom: 12, // space between inputs
    borderRadius: 6, // rounded corners
    color: "#fff", // ← text color inside input
    placeholderTextColor: "#fff", // ← you can't do this here, must pass via prop
  },
  buttonWrapper: { marginTop: 8 }, // space above button
});
