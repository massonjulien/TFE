// Components/Search.js

import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import FoodItem from './Item/FoodItem'

class Recherche extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       dataSource : [], isFetching: false, searchedText : '', isLoading : false
      };
  }

  _displayLoading(){
    if(this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  search(){
    this.setState({isLoading : true})
    if(this.state.searchedText.length > 0 ){
      return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'getSearchText',
          text : this.state.searchedText
        })
      }).then((response) => response.json()).then((responseJson) => {
          console.log(responseJson);
          this.setState({
            dataSource : responseJson, isLoading : false
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.componentDidMount();
    }
  }

  _displayDetailFood = (id) => {
      //console.log(idA)
      this.props.navigation.navigate("FoodDetail", { id: id })
  }

  onRefresh() {
       this.setState({ isFetching: true }, function() { this.componentDidMount() });
       this.setState({ isFetching: false });
  }

  componentDidMount() {
    this.setState({isLoading : true})
    return fetch('https://olitot.com/DB/INC/postgres.php', {
      method: 'POST',
      headers:
      {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      {
        action : 'getSearch'
      })
    }).then((response) => response.json()).then((responseJson) => {
        this.setState({
          dataSource : responseJson,
          isLoading : false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {

      return (
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <TextInput onSubmitEditing={() => this.search()} onChangeText={(text) => this.setState({searchedText : text})} style={styles.textInput} placeholder='Localité'/>
            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress={() => this.search()}>
                <Text style = { styles.btnText }>Rechercher</Text>
            </TouchableOpacity>
          </View>
          {this._displayLoading()}
          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            renderItem={({item}) => <FoodItem displayDetailFood={this._displayDetailFood} food={item}/>}
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
