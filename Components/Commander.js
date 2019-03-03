// Components/Poster.js

import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'


class Poster extends React.Component {

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Les plats commandés</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
    marginBottom: 10
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 5
  }
})

export default Poster
