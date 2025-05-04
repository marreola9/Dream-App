// src/screens/DreamsScreen.js

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,    // wraps content to avoid notches/status bars
  View,            // generic container
  Text,            // for displaying text
  FlatList,        // performant list component
  StyleSheet,      // stylesheet helper
  TouchableOpacity,// touchable wrapper for cards
  Alert,           // for popup alerts
} from 'react-native';
import { Provider, Menu } from 'react-native-paper'; // UI framework for menus
import api, { deleteDream } from '../api';           // API helpers

export default function DreamsScreen({ navigation }) {
  const [dreams, setDreams] = useState([]);   // list of dreams
  const [error, setError]   = useState(null); // error message

  // fetch dreams when component mounts
  useEffect(() => {
    api.get('/dreams')
      .then(res => setDreams(res.data))
      .catch(err => setError(err.message));
  }, []);

  // renders each dream as a card with a popup menu
  const DreamItem = ({ item }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.card}
            onPress={() => setMenuVisible(true)}  // show menu on press
          >
            <Text style={styles.title}>{item.title}</Text>
            {item.climax ? <Text>{item.climax}</Text> : null}
          </TouchableOpacity>
        }
      >
        {/* navigate to edit screen */}
        <Menu.Item
          title="Edit"
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Edit Dream', { dream: item });
          }}
        />
        {/* delete dream and remove from list */}
        <Menu.Item
          title="Delete"
          onPress={async () => {
            setMenuVisible(false);
            try {
              await deleteDream(item._id);
              setDreams(prev => prev.filter(d => d._id !== item._id));
            } catch (e) {
              Alert.alert('Error', e.message);
            }
          }}
        />
        {/* navigate to add-story screen with current dream as param */}
        <Menu.Item
          title="Write Story"
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate('Add Story', { dream: item });
          }}
        />
      </Menu>
    );
  };

  // display error if fetch failed
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  // main render: list of dreams or empty placeholder
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dreams}
          keyExtractor={d => d._id}
          renderItem={({ item }) => <DreamItem item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No dreams yet…</Text>
            </View>
          }
        />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card:      {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  title:     {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  emptyBox:  { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
  error:     { color: 'red', padding: 16, fontSize: 16 },
});
