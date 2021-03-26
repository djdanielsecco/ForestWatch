import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import Mybutton from '../components/Mybutton';
import Mytextinput from '../components/Mytextinput';
import api from '../services/api';
import Fw from "../services/_fw"
import { useNavigation } from '@react-navigation/native';
export default function Login() {
  const navigation = useNavigation();
  let state = {
    email: 'daniel@anu.bz',
    password: 'anubz0987',
    useAuth: false,
  };
  const [user, setUser] = useState(state);
  //const [userInfo, setUserInfo] = useState(app.realm.objects('User'));
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [user_token, setUser_token] = useState('')
  const [csrf_token, setCsrf_token] = useState('')
  const [repositories, setRepositories] = useState([]);
  //const { user, signUp, signIn } = useAuth();
  const signIn = async (email, password) => {
    // TODO: Pass the email and password to Realm's email password provider to log in.
    // Use the setUser() function to set the logged-in user.
  let useAuth =  await Fw.signIn(email, password)
  console.log('useAuth   :',useAuth)
  setUser({useAuth})
   
  };
  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    // TODO: Pass the email and password to Realm's email password provider to register the user.     /app/offline/trees?light=true
    // Registering only registers and does not log in.
  };
  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    // TODO: Log out the current user and use the setUser() function to set the current user to null.
  };
  useEffect(() => {
    // async function loadRepositories() {
    //     const realm = await getRealm();
    //     const data = realm.objects('User');
    //     setRepositories(data);
    //     console.log(repositories)
    //   }
    //   loadRepositories();
    // If there is a user logged in, go to the Projects page.
    console.log(user)
    if (user.useAuth === !false) {
      navigation.navigate("Home");
    }
  }, [state]);
  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    console.log("Press sign in", email);
    try {
      await signIn(email, password);
    } catch (error) {
      // Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };
  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      //   await signUp(email, password);
      //   signIn(email, password);
    
    
    } catch (error) {
      //Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };
  return (
    <View
    style={{  height:"100%",
    padding: 5,
    backgroundColor: 'rgb(255, 255, 255)',
  
  }}
    >
      <Text>Signup or Signin:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="password"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <Mybutton customClick={onPressSignIn} title="Sign In"
      
      style={{
        
      }}
      />
    
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    padding: 5,
    backgroundColor: 'rgb(255, 255, 255)',
  marginTop: 70
  },
  inputStyle: {
   
    padding: 10,
    borderRadius: 2,
    backgroundColor: 'rgb(247, 247, 247)',
   height:80
  },
  manageTeamWrapper: {
    width: 350,
  },
  manageTeamTitle: {
    marginBottom: 10,
  },
  addTeamMemberInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 18,
  },
  manageTeamButtonContainer: {
    textAlign: "left",
    borderTopColor: "grey",
    borderTopWidth: 1,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  plusButton: {
    fontSize: 28,
    fontWeight: "400",
  },
});
// import React from 'react';
// import { View } from 'react-native';
// // import { Container } from './styles';
// const Login = () => {
//   return <View />;
// }
// export default Login;