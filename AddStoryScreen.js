import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { addStory as addStoryAPI } from "../api";

export default function AddStoryScreen({ navigation }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    location: "",
    time: "",
    emotion: "",
    people: "",
    objects: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const addStory = () => {
    if (!form.title.trim() || !form.content.trim()) {
      Alert.alert("Validation", "Title and content are required.");
      return;
    }

    const payload = {
      ...form,
      people: form.people ? form.people.split(",").map((p) => p.trim()) : [],
      objects: form.objects ? form.objects.split(",").map((o) => o.trim()) : [],
    };

    addStoryAPI(payload)
      .then(() => {
        Alert.alert("Success", "Story added!");
        navigation.navigate("Stories");
      })
      .catch((err) => console.error("Add story error:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[
        "title",
        "content",
        "location",
        "time",
        "emotion",
        "people",
        "objects",
        "notes",
      ].map((field) => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          style={styles.input}
          value={form[field]}
          multiline={field === "content"}
          numberOfLines={field === "content" ? 4 : 1}
          onChangeText={(value) => handleChange(field, value)}
        />
      ))}
      <Button title="Save Story" onPress={addStory} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
