import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import api from "../api"; // make sure this is the axios instance

export default function PingScreen() {
  const testPing = async () => {
    try {
      const res = await api.get("/ping"); // axios auto-parses JSON
      console.log("Ping success:", res.data);
      Alert.alert("Ping Success", res.data.message);
    } catch (err) {
      console.error("Ping error:", err);
      Alert.alert("Ping Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Test Ping API" onPress={testPing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
