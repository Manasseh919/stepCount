import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/component/Value";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <View style={styles.values}>
        <Value label="Steps" value="1212 " />
        <Value label="Distance" value="1212 km" />
        <Value label="Flight Climbed" value="0.6km" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },

  values: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
  },
});
