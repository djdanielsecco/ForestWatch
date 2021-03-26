import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from "./navigation/AppNavigator"
import { Provider } from 'react-redux';
import store from "./store/store"
import getRealm from './services/realm';
export default function App() {
  async function str() {
    const realm = await getRealm();
  }
  str()
  return (
    <Provider store={store}>
      <MyStack style={styles.container} />
      <StatusBar style="light" />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
