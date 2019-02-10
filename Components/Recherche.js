// Components/Search.js

import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import food from '../Helpers/ExampleData'
import FoodItem from './FoodItem'

class Recherche extends React.Component {

render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TextInput style={styles.textInput} placeholder='Localité'/>
          <Button style={{ height: 50 }} title='Rechercher' onPress={() => {}} />
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
  }
})

export default Recherche
