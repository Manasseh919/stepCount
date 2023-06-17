import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/component/Value";
import RingProgress from "./src/component/RingProgress";
import useHealthData from "./src/hooks/useHealthData";

export default function App() {
  const { steps, flights, distance } = useHealthData(new Date());

  const STEPS_GOAL = 10_000;
  return (
    <View style={styles.container}>
      <RingProgress
        progress={steps / STEPS_GOAL}
        radius={150}
        strokeWidth={60}
      />
      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)}km`} />
        <Value label="Flight Climbed" value={flights.toString()} />
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
    marginTop: 100,
  },
});
