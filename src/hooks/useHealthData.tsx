import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import { useEffect, useState } from "react";
import appleHealthKit from "react-native-health";
import { Platform } from "react-native";
const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};
const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlight] = useState(0);

  const [distance, setDistance] = useState(0);
  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log("Error checking availability");
        return;
      }
      if (!isAvailable) {
        console.log("Apple Health is not available");
        return;
      }
      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log("eror gettinh permission");
        }
        setHasPermissions(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options: HealthInputOptions = {
      date: date.toISOString(),
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
      setDistance(results.value);
    });
  }, [hasPermissions]);

  return {
    steps,
    flights,
    distance,
  };
};

export default useHealthData;
