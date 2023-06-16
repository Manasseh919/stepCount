import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/component/Value";
import RingProgress from "./src/component/RingProgress";
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import { useEffect, useState } from "react";
import appleHealthKit from "react-native-health";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning
    ],
    write: [],
  },
};

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flight, setFlight] = useState(0);
  const [distance,setDistance] = useState(0)
  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("eror gettinh permission");
      }
      setHasPermissions(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options: HealthInputOptions = {
      date: new Date().toISOString(),
      includeManuallyAdded: false,
      
    };

    appleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("error getting results");
        return;
      }
      console.log(results);
      setSteps(results.value);
    });

    appleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("error getting results");
        return;
      }
      console.log(results);
      setFlight(results.value);
    });
    appleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("error getting results");
        return;
      }
      console.log(results);
      setFlight(results.value);
    });
  }, [hasPermissions]);

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
        <Value label="Distance" value={`${(distance/1000).toFixed(2)}km`} />
        <Value label="Flight Climbed" value={flight.toString()} />
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
