import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView, Platform, FlatList, TouchableOpacity, Switch, SafeAreaView, Image } from 'react-native';
import { useStore } from 'react-redux'
import { useState, useEffect } from 'react';
import Mybutton from './Mybutton';
import Mytext from './Mytext';
import Mytextinput from './Mytextinput';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Fw from '../services/_fw'
import { useBackButton } from '@react-navigation/native';
import { Buffer } from 'buffer'
let q = []
function TagComponent({ route, navigation }) {
  //const { itemId } = route.params //(route.params) ? route.params : "no id"
  //(route.params) ? route.params : "no id"
  const { tagNumber } = route.params;
  //const [tagNumber, setTagNumber] = useState(Number(props.number))
  const [image, setImage] = useState([]);
  const [location, setLocation] = useState(null);
  const [geo_lat, setGeo_lat] = useState(null);
  const [geo_lon, setGeo_lon] = useState(null);
  const [precisao, setPrecisao] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [geo_location, setGeo_location] = useState(null)
  const [altura, setAltura] = useState(null);
  const [position, setposition] = useState(null);
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
    q.push(z);
    return q;
  };
  function DB(x) {
    const tree = Fw.trees_details.filtered(`name_public BEGINSWITH[c] '` + x + `'`);
    let qq = [];
    let oo = {};
    for (const i in tree) {
      oo = Object.assign({}, {
        key: i,
        text: tree[i].name_public,
        cod_tree: tree[i].cod_tree
      });
      qq.push(oo);
    }
    setQuery(qq);
    // console.log(query)
  }
  useEffect(() => {
    let nnn = Fw.tags_details.filtered('number ==' + tagNumber);
    let bbb = nnn[0].images;
    let lll = JSON.parse(nnn[0].geo_location)
//console.log(lll.coords.latitude)
    const realmData = [];
    for (let i in bbb) {
      realmData.push(Buffer.from(bbb[i]).toString('base64'));
      console.log(i);
    }


    (async () => {

      const tree = Fw.trees_details.filtered("cod_tree = " + nnn[0].cod_tree);
      setImage(realmData);
      setGeo_lat(nnn[0].geo_latitude);
      setGeo_lon(nnn[0].geo_longitude);
      setPrecisao(lll.coords.accuracy)
      setAltitude(lll.coords.altitude)
      setAltura(nnn[0].altura_muda);
      setposition(nnn[0].position);

      setIsEnabled(nnn[0].dibble);
      setIsEnabled2(nnn[0].active);
      setData(tree[0].name_public);


    })();
    console.log('atualizou');
    return () => {

      console.log("cleaned upy");
    };
    // console.log('atualizou')
  }, []);
  let text = 'Waiting..';
  let lat = null;
  let lon = null;
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
            console.log("foi ", props.number);
            pickImage(props.number);
          } } />
      </View>
    );
  };
  const FotoI = (props) => {
    return (
      <Image source={{ uri: 'data:image/jpeg;base64,' + props.result }} style={styles.picker} />
    );
  };
  const [Imager0, setImager0] = useState(<PickerI number={0} />);
  const [Imager1, setImager1] = useState(<PickerI number={1} />);
  const [Imager2, setImager2] = useState(<PickerI number={2} />);
  const [Imager3, setImager3] = useState(<PickerI number={3} />);
  const pickImage = async (m) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    //  for (var i in result){
    //   console.log(i)
    //  }
    if (!result.cancelled) {
      // x.push(result.base64)
      //x[x.length] = result.base64
      let y = x(result.base64);
      let d = [...y];
      let j = m;
      //   console.log(image.length)
      // setMuda(result.base64)
      setImage(d);
      if (j === 0) {
        //  setImage(d)
        setImager0(<FotoI result={result.base64} />);
      }
      if (j === 1) {
        setImager1(<FotoI result={result.base64} />);
        //  setImage(d)
      }
      if (j === 2) {
        setImager2(<FotoI result={result.base64} />);
        //  setImage(d)
      }
      if (j === 3) {
        setImager3(<FotoI result={result.base64} />);
        //  setImage(d)
      }
      // console.log('..1', tag_model.altura_muda)
    }
  };
  const takeFoto = async (m) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    // console.log(result);
    if (!result.cancelled) {
      let y = x(result.base64);
      let d = [...y];
      let j = m;
      //  console.log(image.length)
      setImage(d);
      if (j === 0) {
        //  setImage(d)
        setImager0(<FotoI result={result.base64} />);
      }
      if (j === 1) {
        setImager1(<FotoI result={result.base64} />);
        //  setImage(d)
      }
      if (j === 2) {
        setImager2(<FotoI result={result.base64} />);
        //  setImage(d)
      }
      if (j === 3) {
        setImager3(<FotoI result={result.base64} />);
        //  setImage(d)
      }
    }
  };
  useEffect(() => {
    if (location) {
      console.log("tem location");
      setTag_model({
        number: Number(tagNumber),
        cod_tree: cod_tree,
        cod_allotment: null,
        cod_zone: null,
        cod_owner: null,
        position: position,
        geo_latitude: String(location.coords.latitude),
        geo_longitude: String(location.coords.longitude),
        dibble: isEnabled,
        active: isEnabled2,
        images: image,
        altura_muda: altura,
        owner: null,
        selfie: null,
        active_at: null,
        dibble_at: null
      });
    } else {
      console.log("nao tem location");
    }
    return () => {
    };
  }, [cod_tree, isEnabled, isEnabled2, data, image, altura, position]);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <SafeAreaView>
        <FlatList
          data={query}
          renderItem={({ item, i }) => (<TouchableOpacity
            onPress={() => {
              setData(item.text);
              setCod_tree(item.cod_tree);
              setQuery([]);
            } }
          >
            <Text
            >{item.text}</Text>
          </TouchableOpacity>)}
          keyExtractor={item => item.key}
          refreshing />
      </SafeAreaView>
      <View style={{ margin: 10, padding: 20, marginTop: 50, alignItems: 'space-around', justifyContent: 'center', height: 100, flexDirection: 'row' }}>
        {<Image source={{ uri: 'data:image/jpeg;base64,' + image[0] }} style={styles.picker} />}
        {<Image source={{ uri: 'data:image/jpeg;base64,' + image[1] }} style={styles.picker} />}
        {<Image source={{ uri: 'data:image/jpeg;base64,' + image[2] }} style={styles.picker} />}
        {<Image source={{ uri: 'data:image/jpeg;base64,' + image[3] }} style={styles.picker} />}
        {/* {Imager0}
            {Imager1}
            {Imager2}
            {Imager3} */}
      </View>
      {/* <Button title="Pick" onPress={pickImage} /> */}
      {/* <Button title="Take" onPress={takeFoto} /> */}
      <Mytext text={tagNumber}
        title="#" />
      <Mytext text={precisao}
        title="Precision" />
      <Mytext text={geo_lat}
        title="Latitude" />
      <Mytext text={geo_lon}
        title="Longitude" />
      <Mytextinput
        placeholder="Posição"
        // onChangeText={(e) => { setposition(e) }}
        value={position}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{ textAlignVertical: 'top', }} />
      <Mytextinput
        placeholder="Altura"
        // onChangeText={(e) => { setAltura(e) }}
        value={altura}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{ textAlignVertical: 'top' }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Mytextinput
          placeholder="Especie"
          onChangeText={text => { DB(text); } }
          defaultValue={data}
          maxLength={225}
          numberOfLines={5}
          multiline={true}
          style={{ textAlignVertical: 'top' }} />
        <View style={{ margin: 10, padding: 20, alignItems: 'space-between', justifyContent: "space-evenly", flexDirection: 'row' }}>
          <Text>Verificada</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled ? "green" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled} />
          <Text>Plantada</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled2 ? "green" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2} />
        </View>
        <Mybutton
          title="Submit"
          customClick={() => {
            if (typeof Number(tagNumber) != "string" && typeof Number(tagNumber) === "number") {
              if (typeof cod_tree === "number") {
                Fw.registerTag(tag_model);
              } else {
                alert('Preencha tudo');
              }
            } else {
              alert('Preencha tudo');
            }
          } } />
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
