import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Fw from '../services/_fw'
import { Button } from "react-native";
import Mybutton from '../components/Mybutton';
const LOCATION_FETCH_TASK = "upload-job-task-with-location";
const BACKGROUND_FETCH_TASK = "upload-job-task_test";
let dd;
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // await fetch(
  //   "https://sid.anubz.io/1002500"
  // ).then(function (response) {
  //   console.log(response)
  // });

  console.log(BACKGROUND_FETCH_TASK, "running");
    return BackgroundFetch.Result.NewData 
});
TaskManager.defineTask(LOCATION_FETCH_TASK, async () => {


  console.log(LOCATION_FETCH_TASK, "running");
});
export default function App({ route, navigation }) {
  let data = Fw.tags_details
  let [pro, setPro] = useState(data.length)
  let [dsp, setDsp] = useState()
  let cc = pro - 1
  let sync = async () => {

 dd = await Fw.isLogIn()
    if (dd) {
      setDsp(progress)
      for (let i in data) {
        console.log(data[i].number)
        await Fw.postSync(data[i].number)
        setPro(cc--)
      }
      setDsp()
      navigation.navigate("Sucess", { text: `Sucesso  ${data.length}, Tags foram registrada`, patch: "Home" })
    } else {
      navigation.navigate("Fail", { text: `Sua credenciais nao foram validadas` })
    }
  }
  let progress = (<ActivityIndicator size="large" color="black" />)
  useEffect(() => {
    const initBackgroundFetch = async () => {
      console.log("initBackgroundFetch()");
      const locationPermission = await Permissions.askAsync(
        Permissions.LOCATION
      );
      if (
        locationPermission.status === "granted"
      ) {
        const registered = await TaskManager.isTaskRegisteredAsync(
          LOCATION_FETCH_TASK
        );
        if (registered) {
          console.log("registered");
        }
        const backgroundFetchStatus = await BackgroundFetch.getStatusAsync();
        switch (backgroundFetchStatus) {
          case BackgroundFetch.Status.Restricted:
            console.log("Background fetch execution is restricted");
            return;
          case BackgroundFetch.Status.Denied:
            console.log("Background fetch execution is disabled");
            return;
          default:
            console.log("Background fetch execution allowed");
            let isRegistered = await TaskManager.isTaskRegisteredAsync(
              LOCATION_FETCH_TASK
            );
            if (isRegistered) {
              console.log(`Task ${LOCATION_FETCH_TASK} already registered`);
            } else {
              console.log("Background Fetch Task not found - Registering task");
            }
            await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
              minimumInterval: 10,
              startOnBoot: false,
              stopOnTerminate: false
            });
            await Location.startLocationUpdatesAsync(LOCATION_FETCH_TASK, {
              accuracy: Location.Accuracy.Lowest,
              deferredUpdatesInterval: 60000,
              deferredUpdatesDistance: 1000,
              distanceInterval: 1000,
              // foregroundService: {
              //   notificationBody: "Uploading Jobs if available",
              //   notificationTitle: "Background Fetch"
              // }
            });
            await BackgroundFetch.setMinimumIntervalAsync(600);
            console.log("registerTaskAsync");
            break;
        }
      }
    };
    initBackgroundFetch();
    return () => {
      onDisableTask()
    }
  }, []);
  const onDisableTask = async () => {
    const isRegisterd = await TaskManager.isTaskRegisteredAsync(
      LOCATION_FETCH_TASK
    );
    if (isRegisterd)
      await Location.stopLocationUpdatesAsync(LOCATION_FETCH_TASK);
    const isRegisterdFetch = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    if (isRegisterdFetch)
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25
        }}
      > Sync {pro}/{data.length} Tags</Text>
      <View
        style={{
          padding: 20,
          margin: 20,
        }}
      >
        {dsp}
      </View>
      <Mybutton
        title="Sync"
        style={{
          borderWidth: 2,
          borderColor: "black",
        }}
        customClick={async () => {
          // Fw.postSync(text)
          await sync()
        }}
      />
      {/* <Button
        onPress={onDisableTask}
        title="Disable Background Task"
        color="#841584"
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});