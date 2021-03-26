

import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Button,KeyboardAvoidingView, Platform, FlatList, TouchableOpacity, Switch, SafeAreaView, Image } from 'react-native';
import { useStore } from 'react-redux'
import { useState, useEffect } from 'react';
import Mybutton from './Mybutton';
import Mytext from './Mytext';
import Mytextinput from './Mytextinput';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Fw from '../services/_fw'
import { Buffer } from 'buffer'
let q = []
const TagComponent = (props, { route, navigation }) => {
 // const { itemId } = route.params //(route.params) ? route.params : "no id"
  const { tagNumber } = Number(props.number) //(route.params) ? route.params : "no id"
  const store = useStore()
  const [edit, setEdit] = useState(false);
  const [objt, SetObj]=useState()
  const [image, setImage] = useState([]);
  const [location, setLocation] = useState(null);
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
  function DB(x) {

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
    // console.log(query)
  }
  const getItem = (data, index) => ({
    key: data[index].key,
    text: data[index].text,
    cod_tree: data[index].cod_tree
  });
  const getItemCount = (data) => data.length;
  const Item = ({ text }) => (
    <View >
      <Text >{text}</Text>
    </View>
  );
  useEffect(() => {
    let nnn = Fw.tags_details.filtered('number ==' + props.number)
    let bbb = nnn[0].images
    SetObj(nnn[0].geo_latitude)
    const realmData = []
    for (let i in bbb){
   realmData.push(Buffer.from(bbb[i]).toString('base64'))
      console.log( i)
    }
   let x_cod_tree= Fw.trees_details.filtered('cod_tree ==' + nnn[0].cod_tree )
   console.log('>>>>>T' ,x_cod_tree[0].name_public)
  setData(x_cod_tree[0].name_public)
   // const realmData = Buffer.from(bbb[0])
   // console.log( realmData)
    setImage(realmData)
    return () => {
      
    }
  }, [])
  useEffect(() => {
    let locationW

    console.log("ligou")
  if(edit) { (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      try 
     { 
      const GEOLOCATION_OPTIONS = {  accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 2,};
       locationW = await Location.watchPositionAsync(GEOLOCATION_OPTIONS, (location) =>{ 
 
          
          console.log('>>>>', location)
          setLocation(location);
      setTag_model({
        number: Number(tagNumber),
        cod_tree: cod_tree,
        cod_allotment: null,
        cod_zone: null,
        cod_owner: null,
        position: String(location.coords.accuracy),
        geo_latitude: String(location.coords.latitude),
        geo_longitude: String(location.coords.longitude),
        dibble: isEnabled,
        active: isEnabled2,
        images: image,
        altura_muda: null,
        owner: null,
        selfie: null,
        active_at: null,
        dibble_at: null
      })
      
      });
      
    } catch(err){
        console.log("erroerro")
      }
    })();
    console.log('atualizou')
    return () => {
      locationW.remove()
      console.log("cleaned up");
     // setTag_model(Fw.tag_model())
    };}
   console.log('atualizou')
  }, [cod_tree, isEnabled, isEnabled2, data, edit]);

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
  const takeFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    })
   // console.log(result);
    if (!result.cancelled) {
      let y = x(result.base64)
      let d = [...y]
      console.log(image.length)
      setImage(d)
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.uri);
    if (!result.cancelled) {
      // x.push(result.base64)
      //x[x.length] = result.base64
      let y = x(result.base64)
      let d = [...y]
      console.log(image.length)
      setImage(d)
    }
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
           <SafeAreaView  >
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
            >{item.text}</Text>
          </TouchableOpacity>)}
          keyExtractor={item => item.key}
          refreshing
        />
      </SafeAreaView>
      <View style={{ margin: 10, padding: 20, alignItems: 'space-around', justifyContent: 'center', height: 100, flexDirection: 'row' }}>
        {<Image source={{ uri: 'data:image/jpeg;base64,' +  image[0] }} style={{ width: 80, height: 80 }} />}
        {<Image source={{ uri: 'data:image/jpeg;base64,' + image[1] }} style={{ width: 80, height: 80 }} />}
        {<Image source={{ uri: 'data:image/jpeg;base64,' + image[2] }} style={{ width: 80, height: 80 }} />}
        {<Image source={{ uri: 'data:image/jpeg;base64,' + image[3] }} style={{ width: 80, height: 80 }} />}
        {/* { <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />} */}
      </View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take an image from camera roll" onPress={takeFoto} />
      <Button title="Edit" onPress={()=>{setEdit(!edit)}} />
 
      <Mytext text={props.number}
        title="#"
      />
      <Mytext text={text}
        title="Precision"
      />
      <Mytext text={location ? lat : objt }
        title="Latitude"
      />
      <Mytext text={lon}
        title="Longitude"
      />
      <Mytextinput
        placeholder="Posição"
        onChangeText={() => { }}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{ textAlignVertical: 'top' }}
      />
      <Mytextinput
        placeholder="Altura"
        onChangeText={() => { }}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{ textAlignVertical: 'top' }}
      />
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    
    >
      <Mytextinput
        placeholder="Especie"
        onChangeText={text => { DB(text) }}
        defaultValue={data}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{ textAlignVertical: 'top' }}
      />
 
    <View style={{ margin: 10, padding: 20, alignItems: 'space-between', justifyContent: "space-evenly",  flexDirection: 'row' }}>
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
        customClick={() => {
          if (typeof Number(tagNumber) != "string" && typeof Number(tagNumber) === "number") {
            if (typeof cod_tree === "number") {
              Fw.registerTag(tag_model)
            } else {
              alert('Preencha tudo')
            }
          } else {
            alert('Preencha tudo')
          }
        }}
      />
   
        </KeyboardAvoidingView>
    </View>
  );
}
export default TagComponent;
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
});
/*
<Autocomplete
    data={data}
    defaultValue={query}
    onChangeText={text => {}}
    renderItem={({ item, i }) => (
      <TouchableOpacity onPress={() =>{}}>
        <Text>{item}</Text>
      </TouchableOpacity>
    )}
  />
const { query } = this.state;
const data = this._filterData(query);
  <Autocomplete
    data={data}
    defaultValue={query}
    onChangeText={text => this.setState({ query: text })}
    renderItem={({ item, i }) => (
      <TouchableOpacity onPress={() => this.setState({ query: item })}>
        <Text>{item}</Text>
      </TouchableOpacity>
    )}
  />
 <View style={styles.container}>
    <Text style={styles.paragraph}>{text}</Text>
    <Text style={styles.paragraph}>{lat}</Text>
    <Text style={styles.paragraph}>{lon}</Text>
    <Text>Hello, I am your cat!</Text>
  <Text>itemId: {JSON.stringify(itemId)}</Text>
    <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    <Text>{availableMeals.TagNumber}</Text>
  </View>
*/