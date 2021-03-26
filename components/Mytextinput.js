/*Custom TextInput*/
import React from 'react';
import { View, TextInput } from 'react-native';
const Mytextinput = props => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
       
        
      }}>
      <TextInput
      style={{
        ...props.style,
        backgroundColor: 'rgb(247, 247, 247)',
        fontSize: 22,
      }}
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#111825"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        //returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
       // style={props.style}
        blurOnSubmit={false}
        value={props.value}
        defaultValue ={props.defaultValue}
        returnKeyType ="done"
        clearButtonMode="always"
       // caretHidden={true}
        //  contextMenuHidden={true}
      />
    </View>
  );
};
export default Mytextinput;