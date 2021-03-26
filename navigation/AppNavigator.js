import  React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch, useStore } from 'react-redux';
import Fail from '../screens/fail';
import Sucess from '../screens/sucess';
import Scanner from '../screens/scanner';
import Leitor from '../screens/leitor';
import Cadastro from '../screens/cadastro';
import Sync from '../screens/sync';
import ScreensTag from '../screens/screensTag';
import Login from '../screens/login';
import Util from '../screens/util'
import B from '../screens/b';
import TagComponent from "../components/TagComponent"
import HomeScreen from '../screens/menu';
//import getRealm from '../services/realm';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
  },
});
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'grey',
          borderColor: "grey"
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Leitor" component={Leitor} />
      <Stack.Screen name="Fail" component={Fail} />
      <Stack.Screen name="b" component={B} />
      <Stack.Screen name="Sucess" component={Sucess} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Sync" component={Sync} />
      <Stack.Screen name="ScreensTag" component={ScreensTag} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Util" component={Util} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={({ route }) => ({ title: route.params.tagNumber })} />
      <Stack.Screen name="TagComponent" component={TagComponent} options={({ route }) => ({ title: "#: " + route.params.tagNumber })} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer >
      <MyStack>
      </MyStack>
    </NavigationContainer>
  );
}
