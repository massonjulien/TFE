// Components/Poster.js

import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'


class NewPost extends React.Component {

  constructor(){
      super();
      this.state = {nom : '',}
  }

  render() {
    return (
      <View>
        <TextInput
          underlineColorAndroid = "transparent"
          placeholder = "Nom du plat"
          style = { styles.textInput }
          onChangeText = {(text) => this.setState({ nom: text })}
        />

        <TouchableOpacity
          disabled = { this.state.disabled }
          activeOpacity = { 0.8 } style = { styles.Btn }
          onPress = { () => {} }>
            <Text style = { styles.btnText }>S'enregistrer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled = { this.state.disabled }
          activeOpacity = { 0.8 } style = { styles.Btn }
          onPress = {() => this.props.navigation.navigate("Poster") }>
            <Text style = { styles.btnText }>Retour</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
      backgroundColor: 'white',
      height: 40,
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      marginVertical: 5,
      alignSelf: 'stretch',
      padding: 8,
      fontSize: 16
  },
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10
  },
  image : {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  }
})

export default NewPost
