// src/screens/AddStoryScreen.js

import React, { useState, useEffect } from "react";
import {
  SafeAreaView, // handles device notches/status bars
  ScrollView, // enables scrolling when form is long
  Text, // for labels
  TextInput, // for user inputs
  Button, // for the submit action
  StyleSheet, // styling helper
  Alert, // to show popup messages
  View, // generic container
} from "react-native";
import { addStory } from "../api"; // API helper for POST /stories

export default function AddStoryScreen({ navigation, route }) {
  const dream = route.params?.dream; // dream object passed from DreamsScreen
  const dreamId = dream?._id; // optional reference to the original dream

  // form state for each field
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [emotion, setEmotion] = useState("");
  const [people, setPeople] = useState("");
  const [objects, setObjects] = useState("");
  const [notes, setNotes] = useState("");

  // if a dream was provided, you could prefill fields here
  useEffect(() => {
    if (dream) {
      setTitle(`${dream.title} Story`);
      setLocation(dream.location || "");
      setTime(dream.time || "");
      setEmotion(dream.emotion || "");
      setPeople((dream.people || []).join(", "));
      setObjects((dream.objects || []).join(", "));
      setNotes(dream.notes || "");
    }
  }, [dream]);

  // handle form submission
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      return Alert.alert("Validation", "Title and Story are required");
    }
    try {
      await addStory({
        title,
        content,
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
        dreamId,
      });
      Alert.alert("Success", "Story saved!"); // feedback to user
      navigation.navigate("Stories"); // go back to Stories list
    } catch (err) {
      Alert.alert("Error", err.message); // show any API errors
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter story title"
        />

        <Text style={styles.label}>Story:</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          style={[styles.input, { height: 120 }]}
          placeholder="Write your story..."
          multiline
        />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholder="Enter location"
        />

        <Text style={styles.label}>Time:</Text>
        <TextInput
          value={time}
          onChangeText={setTime}
          style={styles.input}
          placeholder="Enter time"
        />

        <Text style={styles.label}>Emotion:</Text>
        <TextInput
          value={emotion}
          onChangeText={setEmotion}
          style={styles.input}
          placeholder="Enter emotion"
        />

        <Text style={styles.label}>People (comma‑separated):</Text>
        <TextInput
          value={people}
          onChangeText={setPeople}
          style={styles.input}
          placeholder="e.g. Alice, Bob"
        />

        <Text style={styles.label}>Objects (comma‑separated):</Text>
        <TextInput
          value={objects}
          onChangeText={setObjects}
          style={styles.input}
          placeholder="e.g. Key, Book"
        />

        <Text style={styles.label}>Notes:</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: 80 }]}
          placeholder="Any additional notes..."
          multiline
        />

        <View style={styles.button}>
          <Button title="Save Story" onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#045E95" }, // full screen
  container: { padding: 16 },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    color: "white",
  }, // field label style
  input: {
    borderWidth: 1, // visible border
    borderColor: "#ccc", // light gray
    padding: 12, // inner spacing
    marginBottom: 12, // space between inputs
    borderRadius: 6, // rounded corners
    color: "#fff",
  },
  button: { marginTop: 8 }, // space above the save button
});
