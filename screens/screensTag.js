import React from 'react';
import { View, FlatList, Text, SafeAreaView, TouchableOpacity, Button, TextInput } from 'react-native';
import Fw from "../services/_fw"
import { useState, useEffect } from 'react';
import TagComponent from "../components/TagComponent"
// import { Container } from './styles';
const TagScreen = ({ route, navigation }) => {
  const tags = Fw.tags_details.sorted("number")
  const tagsObj = () => {
    let qq = []
    let oo = {}
    for (const i in tags) {
      oo = Object.assign({}, {
        key: i,
        text: tags[i].number, //+" _ "+ tree[i].name_scientific
      })
      qq.push(oo)
    }
    //console.log(qq[3].obj.number)
    return qq
  }
  const [query, setQuery] = useState(tagsObj)
  const editor = (nuber, obj) => {
    return (
      <TagComponent
        number={nuber}
      />
    )
  }
  const element = (x) => {
    return (<View>
      <SafeAreaView  >
        <TextInput
          style={{ width: "100%", height: 50, borderColor: 'gray', borderWidth: 1 }}
          keyboardType="decimal-pad"
          onChangeText={t => { DB(t) }}
          // value={value}
          // onChange={text => }
          // onChangeText={goalInputHandler}
          // value={enteredGoal}
          editable
          placeholder="Search"
        />
        <FlatList
          data={x}
          renderItem={({ item, i }) => (<TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 1,
            }}
            onPress={() => {
              navigation.navigate('TagComponent', {
                tagNumber: Number(item.text),
              })
              //FF(editor(item.text))
            }}
          >
            <Text
              style={{
                alignItems: 'center',
                borderColor: "black",
                borderWidth: 1,
                width: "100%",
                height: 35,
                padding: 10
              }}
            >#:{item.text}</Text>
          </TouchableOpacity>)}
          keyExtractor={item => item.key}
          refreshing
        />
      </SafeAreaView>
    </View>)
  }
  const [ff, FF] = useState(element(query))
  function DB(x) {
    if (x) {
      const tags = Fw.tags_details.filtered("number ==" + x)
      // const tags = Fw.tags_details.filtered('number in ' + x)
      let qq = []
      let oo = {}
      for (const i in tags) {
        oo = Object.assign({}, {
          key: i,
          text: tags[i].number, //+" _ "+ tree[i].name_scientific
        })
        qq.push(oo)
      }
      console.log(qq)
      console.log(qq.length)
      if (qq.length === 1) {
        //setQuery(qq)
        FF(element(qq))
      } else {
        FF(element(query))
      }
    }
  }
  return (
    ff
  );
}
export default TagScreen;
