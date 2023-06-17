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
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};
const useHealthData = (date:Date) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlight] = useState(0);

  const [distance, setDistance] = useState(0);
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
