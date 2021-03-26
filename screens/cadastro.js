import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, KeyboardAvoidingView, Platform, FlatList, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Switch, SafeAreaView, Image } from 'react-native';
import { useStore } from 'react-redux'
import { useState, useEffect } from 'react';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Fw from '../services/_fw'
import { useBackButton } from '@react-navigation/native';
let q = []
const Cadastro = ({ route, navigation }) => {
  const { itemId } = route.params //(route.params) ? route.params : "no id"
  const { tagNumber } = route.params  //(route.params) ? route.params : "no id"
  const store = useStore()
  const [muda, setMuda] = useState('')
  const [image, setImage] = useState([]);
  const [location, setLocation] = useState(null);
  const [geo_lat, setGeo_lat] = useState(null)
  const [geo_lon, setGeo_lon] = useState(null)
  const [precisao, setPrecisao] = useState(null)
  const [altitude, setAltitude] = useState(null)
  const [altura, setAltura] = useState(null)
  const [position, setposition] = useState(null)
  const [tag_model, setTag_model] = useState(Fw.tag_model);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState('');
  const [cod_tree, setCod_tree] = useState(null);
  const [query, setQuery] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  let x = (z) => {
    q.push(z)
    return q
  }
  function queryTrees(x) {
    if (x) {
      const tree = Fw.trees_details.filtered(`name_public BEGINSWITH[c] '` + x + `'`)
      let qq = []
      let oo = {}
      for (const i in tree) {
        oo = Object.assign({}, {
          key: i,
          text: tree[i].name_public, //+" _ "+ tree[i].name_scientific
          cod_tree: tree[i].cod_tree
        })
        qq.push(oo)
      }
      setQuery(qq)
    } else {
      setQuery([])
    }
    // console.log(query)
  }
  useEffect(() => {
    let locationW
    (async () => {
      // if (Platform.OS !== 'web') {
      //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //   if (status !== 'granted') {
      //     alert('Sorry, we need camera roll permissions to make this work!');
      //   }
      // }
      if (Platform.OS === 'ios') {
        // setErrorMsg(
        //   'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        // );
        // return;
        console.log('>>>>x', Constants.isDevice ? "Device" : "Simulator")
      }
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      try {
        const GEOLOCATION_OPTIONS = {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 2,
        };
        locationW = await Location.watchPositionAsync(GEOLOCATION_OPTIONS, (locationX) => {
          // console.log('>>>>x', locationX)
          setLocation(locationX);
        });
        // console.log('..2>', locationW)
      } catch (err) {
        console.log("erroerro")
      }
    })();
    console.log('atualizou')
    return () => {
      locationW.remove()
      console.log("cleaned upx");
      setTag_model(Fw.tag_model())
      setImage([])
      q = []
      console.log("cleaned upy");
    };
    // console.log('atualizou')
  }, []);
  let text = 'Waiting..';
  let lat = null
  let lon = null
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.accuracy);
    lat = JSON.stringify(location.coords.latitude);
    lon = location.coords.longitude;
  }
  const PickerI = (props) => {
    return (
      <View
        style={styles.picker}
      >
        <Icon name="plus-circle"
          style={{
            color: '#ffffff',
            padding: 10,
            fontSize: 35
          }}
          onPress={() => {
            console.log("foi ", props.number)
            pickImage(props.number)
            // takeFoto(props.number)
          }}
        />
      </View>
    )
  }
  const FotoI = (props) => {
    return (
      <Image source={{ uri: 'data:image/jpeg;base64,' + props.result }} style={styles.picker} />
    )
  }
  const [Imager0, setImager0] = useState(<PickerI number={0} />)
  const [Imager1, setImager1] = useState(<PickerI number={1} />)
  const [Imager2, setImager2] = useState(<PickerI number={2} />)
  const [Imager3, setImager3] = useState(<PickerI number={3} />)
  const pickImage = async (m) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 2048,
        maxWidth: 2048,
        quality: 0.2,
      },
      (result) => {
        if (!result.didCancel) {
          let y = x(result.base64)
          let d = [...y]
          let j = m
          console.log('width....>>> ', result.width)
          setImage(d)
          if (j === 0) {
            setImager0(<FotoI result={result.base64} />)
          }
          if (j === 1) {
            setImager1(<FotoI result={result.base64} />)
          }
          if (j === 2) {
            setImager2(<FotoI result={result.base64} />)
          }
          if (j === 3) {
            setImager3(<FotoI result={result.base64} />)
          }
          // console.log('..1', tag_model.altura_muda)
        }
      },
    )
    //  for (var i in result){
    //   console.log(i)
    //  }
  };
  const takeFoto = async (m) => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 2048,
        maxWidth: 2048,
        quality: 0.2,
      },
      (result) => {
        if (!result.didCancel) {
          // x.push(result.base64)
          //x[x.length] = result.base64
          let y = x(result.base64)
          let d = [...y]
          let j = m
          console.log('width....>>> ', result.width)
          // setMuda(result.base64)
          setImage(d)
          if (j === 0) {
            setImager0(<FotoI result={result.base64} />)
          }
          if (j === 1) {
            setImager1(<FotoI result={result.base64} />)
          }
          if (j === 2) {
            setImager2(<FotoI result={result.base64} />)
          }
          if (j === 3) {
            setImager3(<FotoI result={result.base64} />)
          }
          // console.log('..1', tag_model.altura_muda)
        }
      },
    )
  }
  useEffect(() => {
    if (location) {
      console.log("tem location")
      setTag_model({
        number: Number(tagNumber),
        cod_tree: cod_tree,
        cod_allotment: null,
        cod_zone: null,
        cod_owner: null,
        position: position,
        geo_latitude: String(location.coords.latitude),
        geo_longitude: String(location.coords.longitude),
        geo_location: JSON.stringify(location),
        dibble: isEnabled2,
        active: isEnabled,
        images: image,
        altura_muda: altura,
        owner: null,
        selfie: null,
        active_at: null,
        dibble_at: null
      })
    } else {
      console.log("nao tem location")
    }
    return () => {
    };
  }, [cod_tree, isEnabled, isEnabled2, data, image, altura, position])
  return (
    <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: "space-around",
          //flexDirection: 'column'
        }}>
          <View style={{ flex: 1, margin: 10, padding: 20, marginTop: 35, alignItems: 'space-around', justifyContent: 'center', height: 100, flexDirection: 'row' }}>
            {Imager0}
            {Imager1}
            {Imager2}
            {Imager3}
          </View>
          <Mytext text={tagNumber}
            title="#"
          />
          <Mytext text={text}
            title="Precision"
          />
          <Mytext text={lat}
            title="Latitude"
          />
          <Mytext text={lon}
            title="Longitude"
          />
          <TextInput
            style={{
              height: 35,
              borderRadius: 2,
              backgroundColor: 'rgb(247, 247, 247)',
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
            }}
            placeholder="Posição"
            placeholderTextColor="#111825"
            onChangeText={(e) => { setposition(e) }}
            editable={true}
            caretHidden={true}
            contextMenuHidden={true}
            clearButtonMode="always"
            returnKeyType="done"
          />
          <TextInput
            style={{
              height: 35,
              borderRadius: 2,
              backgroundColor: 'rgb(247, 247, 247)',
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
             
            }}
            placeholderTextColor="#111825"
            keyboardType="decimal-pad"
            onChangeText={(e) => { setAltura(e) }}
            editable={true}
            caretHidden={true}
            contextMenuHidden={true}
            clearButtonMode="always"
            returnKeyType="done"
            placeholder="Altura"
          />
          <SafeAreaView style={{ maxHeight: 100,
             borderRadius: 2,
             backgroundColor: 'rgb(247, 247, 247)',
             marginLeft: 35,
             marginRight: 35,
             marginTop: 10,
          }} >
            <FlatList
              data={query}
              renderItem={({ item, i }) => (<TouchableOpacity
                onPress={() => {
                  setData(item.text);
                  setCod_tree(item.cod_tree)
                  setQuery([]);
                }}
              >
                <Text
                  style={{ fontSize: 20, marginBottom: 2, marginLeft: 5 }}
                >{item.text}</Text>
              </TouchableOpacity>)}
              keyExtractor={item => item.key}
              refreshing
            />
          </SafeAreaView>
          <TextInput
            placeholder="Especie"
            placeholderTextColor="#111825"
            onChangeText={text => { queryTrees(text) }}
            defaultValue={data}
            style={{ textAlignVertical: 'top',  
            height: 35,
            borderRadius: 2,
            backgroundColor: 'rgb(247, 247, 247)',
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10, }}
            editable={true}
            caretHidden={true}
            contextMenuHidden={true}
            clearButtonMode="always"
            returnKeyType="done"
          />
          <View style={{ margin: 10, padding: 20, alignItems: 'space-between', justifyContent: "space-evenly", flexDirection: 'row' }}>
            <Text>Verificada</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isEnabled ? "green" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text>Plantada</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isEnabled2 ? "green" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch2}
              value={isEnabled2}
            />
          </View>
          <Mybutton
            title="Submit"
            customClick={async () => {
              if (typeof Number(tagNumber) != "string" && typeof Number(tagNumber) === "number") {
                if (typeof cod_tree === "number") {
                  let a = await Fw.registerTag(tag_model)
                  console.log(a)
                  if (a) {
                    navigation.navigate("Sucess", { text: `Sucesso a Tag de número ${tagNumber} , foi registrada`, patch: "Leitor" })
                  }
                } else {
                  alert('Preencha tudo')
                }
              } else {
                alert('Preencha tudo')
              }
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export default Cadastro;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  picker: {
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: "center",
    borderColor: 'gray',
    padding: 10,
    borderRadius: 20,
    backgroundColor: "grey",
    margin: 5
  },
});
