
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


export default function Sucess({route, navigation }) {
  const {text, patch} = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#7AB645"}}>
      <Text style={{ fontSize: 30 }}>{text} </Text>
      <Button onPress={() => navigation.navigate(patch)} title="FECHAR" />
    </View>
  );
}




