import React from 'react';
import { View } from 'react-native';
import { useState, useEffect } from 'react';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Fw from '../services/_fw'
import api from '../services/api';
// import { Container } from './styles';
const Util = () => {
  const { Db, user_details, trees_details, tags_details } = Fw
  const [text, setText] = useState('')
  let us = (...args) => {
    return args
  }
  let state = {
    email: 'daniel@anu.bz',
    password: 'anubz0987',
    useAuth: false,
  };
  let deleteAllTag = () => {
    Db.write(() => {
      // Create a book object
      // Delete the book
      Db.delete(tags_details);
    });
  }
  async function sU() {
   
    console.log(user_details[0].csrf_token);
    try {
      api.defaults.headers.common['csrf_token'] = user_details[0].csrf_token;
      // const response = await api.get(`/1002500`).then(function (response) {
      const response = await api.get(`/app/offline/trees?light=true`).then(function (response) {
        for (const res in response.data) {
          console.log(response.data[res].cod_tree + "   <>  " + response.data[res].name_public + "   <>  " + response.data[res].name_scientific);
          //console.log(res); 
          let data = {
            cod_tree: response.data[res].cod_tree,
            name_public: response.data[res].name_public,
            name_scientific: response.data[res].name_scientific
          }
         Db.write(() => {
          Db.create('Trees', data, 'modified');
          });
        }
      });
      // await setRepositories(response.data);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);
  return (
    <View>
      <Mytext text={Fw.getUser().csrf_token}
        title="OUT"
      />
      <Mytextinput
        placeholder="Text input"
        onChangeText={(tex) => {
          setText(tex)
          console.log(text)
        }}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{ textAlignVertical: 'top' }}
      />
      <Mybutton
        title="Sing Out"
        customClick={async () => {
          Fw.signOut()
        }}
      />
      <Mybutton
        title="Is Log"
        customClick={async () => {
          //Fw.signOut()
          console.log(await Fw.isLogIn())
        }}
      />
      <Mybutton
        title="Post Tag"
        customClick={async () => {
          Fw.postSync(text)
        }}
      />
      <Mybutton
        title="Delete All"
        customClick={async () => {
          deleteAllTag()
        }}
      />
      <Mybutton
        title="TREES"
        customClick={async () => {
        sU()
        }}
      />
    </View>
  );
}
export default Util;