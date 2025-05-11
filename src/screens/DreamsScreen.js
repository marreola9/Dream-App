import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Provider, Menu } from "react-native-paper";
import colors from "../theme/colors";
import api, { deleteDream } from "../api";

import { ImageBackground } from "react-native";
import earth from "../../assets/Somnia.png"; // path to your image

export default function DreamsScreen({ navigation }) {
  const [dreams, setDreams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/dreams")
      .then((res) => setDreams(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const DreamItem = ({ item }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <View style={styles.card}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              {item.climax && (
                <View style={styles.bodyContainer}>
                  <Text style={styles.body}>{item.climax}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        }
      >
        <Menu.Item
          title="Edit"
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate("Edit Dream", { dream: item });
          }}
        />
        <Menu.Item
          title="Delete"
          onPress={async () => {
            setMenuVisible(false);
            try {
              await deleteDream(item._id);
              setDreams((prev) => prev.filter((d) => d._id !== item._id));
            } catch (e) {
              Alert.alert("Error", e.message);
            }
          }}
        />
        <Menu.Item
          title="Write Story"
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate("Add Story", { dream: item });
          }}
        />
      </Menu>
    );
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={earth}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.containerOverlay}>
            <FlatList
              data={dreams}
              keyExtractor={(d) => d._id}
              renderItem={({ item }) => <DreamItem item={item} />}
              ListEmptyComponent={
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyText}>No dreams yet…</Text>
                </View>
              }
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  containerOverlay: {
    flex: 1,
    padding: 16,
    // backgroundColor: "rgba(0, 0, 0, 0.15)", // optional overlay
  },

  card: {
    marginBottom: 24,
  },
  titleContainer: {
    backgroundColor: "#045E95",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.sky,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bodyContainer: {
    backgroundColor: "#DFB204",
    padding: 16,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.midnight,
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  body: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.gold,
  },
  error: {
    color: colors.gold,
    padding: 16,
    fontSize: 16,
  },
});
