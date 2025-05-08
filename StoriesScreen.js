import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import { fetchStories as fetchStoriesAPI } from "../api";

export default function StoriesScreen() {
  const [stories, setStories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStoriesAPI()
      .then(setStories)
      .catch((err) => console.error("Fetch stories error:", err));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStoriesAPI()
      .then(setStories)
      .catch((err) => console.error("Fetch stories error:", err))
      .finally(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No stories found.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#d0e0ff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});
