import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [
        {
          name: 'Leitor',
          icon: "arrow-right",
          path: "Leitor"
        },
        {
          name: 'Tag`s',
          icon: "arrow-right",
          path: "ScreensTag"
        },
        {
          name: 'Sync',
          icon: "arrow-right",
          path: "Sync"
        },
        {
          name: 'Login',
          icon: "arrow-right",
          path: "Login"
        },
        {
          name: 'Util',
          icon: "arrow-right",
          path: "Util"
        },
        {
          name: 'BLANK',
          icon: "arrow-right",
          path: "b"
        },
      ],
    }
  }
  HomeScreen = () => {
    let newCards = this.state.tools.map((u, i) => {
      return (
        <View key={i}
          style={{
            width: "35%",
            height: "20%",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: 'gray',
            //borderWidth: 1,
            margin: 10,
            padding: 10,
            borderRadius: 2,
            backgroundColor: "#7AB645",
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 22,
            }}
            onPress={() => this.props.navigation.navigate(u.path, {
              itemId: '',
              otherParam: '',
            })}
          >
            {u.name}
          </Text>
          <Icon name={u.icon}
            style={{
              color: '#ffffff',
            }}
          />
        </View>
      )
    })
    return newCards
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <View style={styles.container1}>
        <this.HomeScreen />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container1: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    paddingTop: 100
  },
});