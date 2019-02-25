// Components/Search.js

import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'
import food from '../Helpers/ExampleData'
import FoodItem from './FoodItem'

class Recherche extends React.Component {

_search = () => {

}

render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TextInput style={styles.textInput} placeholder='Localité'/>
          <TouchableOpacity
            activeOpacity = { 0.8 } style = { styles.Btn }
            onPress={this.search}>
              <Text style = { styles.btnText }>Rechercher</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={food}
          keyExtractor={(item) => item.nom.toString()}
          renderItem={({item}) => <FoodItem food={item}/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
    flex: 1,
  },
  txt: {
    marginTop: 80
  },
  textInput: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    backgroundColor: 'white'
  },
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10,
      marginHorizontal : 5,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
})

export default Recherche
