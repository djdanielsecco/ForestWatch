import React from 'react';
import { StyleSheet, Text, View, Button  } from 'react-native';





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


export default function Fail({route, navigation }) {
  const {text} = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"red"}}>
      <Text style={{ fontSize: 50 }}>WoOps! </Text>
      <Text style={{ fontSize: 30 }}>{text} </Text>
      <Button onPress={() => navigation.goBack()} title="FECHAR" />
    </View>
  );
}




