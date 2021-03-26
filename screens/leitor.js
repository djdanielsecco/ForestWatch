import React, { Component } from 'react';
import { useState, SafeAreaProvider } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import Mybutton from '../components/Mybutton';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { connect } from 'react-redux'
export class Leitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagNumber: this.props.route.params.tagNumber,
    };
  }
  componentDidMount() {
    console.log("Mount")
  }
  componentWillUnmount() {
    console.log("UnMount")
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.state.tagNumber !== prevState.tagNumber) {
  //     console.log("change")
  //   }
  // }
  Leitor = () => {
    const store = useStore()
    const dispatch = useDispatch()
    const goScanner = () => this.props.navigation.navigate('Scanner')
    const [value, onChangeText] = useState(null);
    const [enteredGoal, setEnteredGoal] = useState("");
    const goalInputHandler = (enteredText) => {
      setEnteredGoal(enteredText);
      this.setState({
        tagNumber: enteredText,
      });
      store.dispatch(addTodo(`${enteredText}`))
      //alert(enteredText)
    };
    function addTodo(t) {
      return {
        type: 'Update',
        TagNumber: t
      }
    }
    const confirmFinish = () => {
      if (typeof Number(this.state.tagNumber) != "string" && typeof Number(this.state.tagNumber) === "number" && this.props.TAG.TagNumber != '') {
        store.dispatch(addTodo(`${enteredGoal}`));
        this.props.navigation.navigate('Cadastro', {
          itemId: null,
          tagNumber: this.props.TAG.TagNumber,
        })
      } else {
        alert("Digite um numero valido")
      }
    }
    return (
      <View style={styles.container3}>
        <Text>
          Digite o número da Tag ou utilize o leitor de QR code.
        </Text>
        <TextInput
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 2,
            backgroundColor: 'rgb(247, 247, 247)',
            height: 80,
            margin: 10,
          }}
          keyboardType="decimal-pad"
          onChangeText={goalInputHandler}
          defaultValue={this.props.TAG.TagNumber}
          editable={true}
          caretHidden={true}
          contextMenuHidden={true}
          clearButtonMode="always"
          placeholder="Tag Number #"
          returnKeyType ="done"
        />
        <Mybutton
          title={'Scanner'}
          customClick={() => goScanner()}
        />
        <Mybutton
          title={'Continuar'}
          customClick={() => confirmFinish()}
        />
      </View>
    );
  }
  render() {
    return (
      <this.Leitor />
    )
  }
}
const mapStateToProps = (store) => {
  return { TAG: store.Tag }
}
export default connect(mapStateToProps)(Leitor)
const styles = StyleSheet.create({
  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
});