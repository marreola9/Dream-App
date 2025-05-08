import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { updateDream as updateDreamAPI } from "../api";

export default function EditDreamScreen({ route, navigation }) {
  const { dream } = route.params;

  const [form, setForm] = useState({
    title: dream.title || "",
    climax: dream.climax || "",
    location: dream.location || "",
    time: dream.time || "",
    emotion: dream.emotion || "",
    people: (dream.people || []).join(", "),
    objects: (dream.objects || []).join(", "),
    notes: dream.notes || "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const updateDream = () => {
    const payload = {
      ...form,
      people: form.people ? form.people.split(",").map((p) => p.trim()) : [],
      objects: form.objects ? form.objects.split(",").map((o) => o.trim()) : [],
    };

    // ✅ Use centralized API function
    updateDreamAPI(dream._id, payload)
      .then(() => {
        Alert.alert("Success", "Dream updated!");
        navigation.navigate("Dreams");
      })
      .catch((err) => console.error("Update dream error:", err));
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
      <Button title="Update Dream" onPress={updateDream} />
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
