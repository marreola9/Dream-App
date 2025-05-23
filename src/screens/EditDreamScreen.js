import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, Button, Alert, View } from "react-native";
import api, { updateDream } from "../api"; // API helper for PUT /dreams/:id
import { editDreamStyles as styles } from "./ScreenStyles"; // Import styles
import bgpic from "../../assets/bgpic.png"; // Import the background image

import { ImageBackground, Text } from "react-native";

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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={bgpic}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.containerOverlay}>
          <Text style={styles.header}>Edit Dream</Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Climax"
            value={climax}
            onChangeText={setClimax}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Time"
            value={time}
            onChangeText={setTime}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Emotion"
            value={emotion}
            onChangeText={setEmotion}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="People (comma‑separated)"
            value={people}
            onChangeText={setPeople}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Objects (comma‑separated)"
            value={objects}
            onChangeText={setObjects}
            style={styles.input}
            placeholderTextColor="#ccc"
          />

          <TextInput
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
            style={[styles.input, { height: 80 }]}
            multiline
            placeholderTextColor="#ccc"
          />

          <View style={styles.buttonWrapper}>
            <Button title="Save Changes" onPress={handleSave} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
