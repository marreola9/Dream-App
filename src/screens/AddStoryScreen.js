import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Button,
  Alert,
  View,
  ImageBackground,
} from "react-native";
import { addStory } from "../api"; // API helper for POST /stories
import { addStoryStyles as styles } from "./ScreenStyles"; // Import styles for AddStoryScreen
import bgpic from "../../assets/bgpic.png"; // Import the background image

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
    <ImageBackground source={bgpic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.containerOverlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={styles.header}>Add A New Story</Text>

          <Text style={styles.label}>Title:</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Enter story title"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Story:</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            style={[styles.input, { height: 120 }]}
            placeholder="Write your story..."
            multiline
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Location:</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholder="Enter location"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Time:</Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            style={styles.input}
            placeholder="Enter time"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Emotion:</Text>
          <TextInput
            value={emotion}
            onChangeText={setEmotion}
            style={styles.input}
            placeholder="Enter emotion"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>People (comma‑separated):</Text>
          <TextInput
            value={people}
            onChangeText={setPeople}
            style={styles.input}
            placeholder="e.g. Alice, Bob"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Objects (comma‑separated):</Text>
          <TextInput
            value={objects}
            onChangeText={setObjects}
            style={styles.input}
            placeholder="e.g. Key, Book"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Notes:</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            style={[styles.input, { height: 80 }]}
            placeholder="Any additional notes..."
            multiline
            placeholderTextColor="#ccc"
          />

          <View style={styles.button}>
            <Button title="Save Story" onPress={handleSave} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
