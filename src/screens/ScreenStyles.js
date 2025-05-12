import { StyleSheet } from "react-native";

const sharedStyles = {
  input: {
    borderWidth: 1,
    borderColor: "#b8E0E2",
    padding: 16,
    marginBottom: 12,
    borderRadius: 6,
    color: "#b8E0E2",
    backgroundColor: "#001638",
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
    color: "#045e95",
  },
  buttonWrapper: {
    marginTop: 8,
    backgroundColor: "#B8E0E2",
    borderRadius: 6,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  containerOverlay: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#DFB204",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 20,
    fontFamily: "cursive",
  },
};

const addDreamStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // allow content to scroll
    justifyContent: "flex-start",
  },
  container: {
    padding: 30,
  },
  ...sharedStyles,
});

const addStoryStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  ...sharedStyles,
});

const dreamsScreenStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 30,
  },
  ...sharedStyles,
});

const editDreamStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 30,
  },
  ...sharedStyles,
});

const pingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ...sharedStyles,
});

const storiesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#B8E0E2",
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#999",
  },
  error: {
    color: "red",
    padding: 16,
  },
  ...sharedStyles,
});

export {
  addDreamStyles,
  addStoryStyles,
  dreamsScreenStyles,
  editDreamStyles,
  pingScreenStyles,
  storiesScreenStyles,
};
