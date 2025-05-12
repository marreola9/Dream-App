import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { getStories } from "../api"; // API helper for GET /stories
import { storiesScreenStyles as styles } from "./ScreenStyles"; // Import styles
import bgpic from "../../assets/bgpic.png"; // Import the background image

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
    <ImageBackground source={bgpic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.containerOverlay}>
        {/* Header */}
        <Text style={styles.header}>Stories</Text>

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
    </ImageBackground>
  );
}
