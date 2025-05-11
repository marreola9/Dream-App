// src/screens/StoriesScreen.js

import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView, // handles device notches/status bars
  View, // generic container
  Text, // for displaying text
  FlatList, // performant scrolling list
  StyleSheet, // styling helper
  RefreshControl, // pull‑to‑refresh functionality
} from "react-native";
import { getStories } from "../api"; // API helper for GET /stories

export default function StoriesScreen() {
  const [stories, setStories] = useState([]); // list of story objects
  const [error, setError] = useState(null); // error message if fetch fails
  const [refreshing, setRefreshing] = useState(false); // pull‑to‑refresh state

  // fetch stories from backend
  const fetchStories = async () => {
    try {
      const res = await getStories();
      setStories(res.data);
      setError(null);
    } catch (e) {
      setError(e.message); // store error for display
    }
  };

  // fetch once on component mount
  useEffect(() => {
    fetchStories();
  }, []);

  // handle pull‑to‑refresh gesture
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStories().finally(() => setRefreshing(false));
  }, []);

  // render a single story card
  const StoryCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={3}>{item.content}</Text>
    </View>
  );

  // display error message if fetch failed
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  // main render: list of stories with pull‑to‑refresh
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(s) => s._id}
        renderItem={StoryCard}
        // show placeholder when list is empty
        ListEmptyComponent={<Text style={styles.empty}>No stories yet…</Text>}
        // enable pull‑to‑refresh
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#e9f1ff", // light blue background
    borderRadius: 8,
  },
  title: { fontWeight: "bold", marginBottom: 4, fontSize: 16 },
  empty: { marginTop: 40, textAlign: "center", color: "#999" },
  error: { color: "red", padding: 16 },
});
