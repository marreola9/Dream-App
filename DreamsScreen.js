import {
  fetchDreams as fetchDreamsAPI,
  deleteDream as deleteDreamAPI,
} from "../api";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";

export default function DreamsScreen({ navigation }) {
  const [dreams, setDreams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDreamsAPI()
      .then(setDreams)
      .catch((err) => console.error("Fetch dreams error:", err));
  }, []);

  const deleteDream = (id) => {
    deleteDreamAPI(id)
      .then(() => setDreams(dreams.filter((d) => d._id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDreamsAPI()
      .then(setDreams)
      .catch((err) => console.error("Fetch dreams error:", err))
      .finally(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dreams}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.buttons}>
              <Button
                title="Edit"
                onPress={() =>
                  navigation.navigate("Edit Dream", { dream: item })
                }
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => deleteDream(item._id)}
              />
            </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
});
