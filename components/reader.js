import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector, useDispatch, useStore  } from 'react-redux';
import MyState from '../store/reducers/MyState';
//import store from "../store/store"
import { useNavigation } from '@react-navigation/native';
export default function App() {
  const store = useStore()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch()
  const availableMeals = useSelector(state => state.Tag);
  const navigation = useNavigation();
  function addTodo(t) {
   return {
      type: 'Update',
       TagNumber: t
    }
  
  }
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();


  }, []);
  useEffect(() => {
    return () => {
      console.log("cleaned up reader");
    };
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data}`);
//dispatch(MyState( addTodo(`${data}`)))
var res = data.substr(21, 7)
 store.dispatch(addTodo(`${res}`))

 navigation.navigate('Leitor',{
  itemId: null,
  tagNumber: `${res}`,
})
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  barCodeView: {
    width: '100%', 
    height: '50%', 
    marginBottom: 40
  },
});
