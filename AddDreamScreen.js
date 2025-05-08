import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { addDream as addDreamAPI } from "../api"; // Using the centralized API

export default function AddDreamScreen({ navigation }) {
  const [form, setForm] = useState({
    title: "",
    climax: "",
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

  const addDream = () => {
    if (!form.title.trim()) {
      Alert.alert("Validation", "Title is required.");
      return;
    }

    const payload = {
      ...form,
      people: form.people ? form.people.split(",").map((p) => p.trim()) : [],
      objects: form.objects ? form.objects.split(",").map((o) => o.trim()) : [],
    };

    // ✅ Use centralized API function
    addDreamAPI(payload)
      .then(() => {
        Alert.alert("Success", "Dream added!");
        navigation.navigate("Dreams");
      })
      .catch((err) => console.error("Add dream error:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[
        "title",
        "climax",
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
          onChangeText={(value) => handleChange(field, value)}
        />
      ))}
      <Button title="Save Dream" onPress={addDream} />
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
