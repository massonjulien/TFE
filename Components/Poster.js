import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'


class Poster extends React.Component {

  render() {

      if(this.props.connected){
        return (
          <View style={styles.container}>
            <View style={styles.firstContainer}>
              <Text style={styles.Title}>Mes annonces</Text>
            </View>
            <View style={styles.flatContainer}>
            </View>
            <View style={styles.lastContainer}>
              <TouchableOpacity
                activeOpacity = { 0.8 } style = { styles.Btn }
                onPress = {() => this.props.navigation.navigate("NewPost")}>
                  <Text style = { styles.btnText }>Nouvelle annonce</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity = { 0.8 } style = { styles.Btn }
                onPress = {() => this.props.navigation.navigate("Address")}>
                  <Text style = { styles.btnText }>Mes Adresses</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.containerUnconnected}><Text style={styles.txUnconnected}>Vous devez être connecté pour pouvoir poster une annonce !</Text></View>
        )
      }


  }
}

const styles = StyleSheet.create({
  Title : {
      textAlign: 'center',
      fontSize: 20,
      color: 'grey',
      marginBottom: 10
  },
  txUnconnected : {
    margin : 25,
    color : 'grey',
    fontSize : 17,
    textAlign:'center',
  },
  containerUnconnected : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container : {
      flex : 1,
      marginHorizontal : 15,
      marginBottom : '5%',
  },
  firstContainer : {
    marginTop : 30,
    flex : 1,
  },
  flatContainer : {
    flex : 7,
  },
  lastContainer : {
    flex : 1,
  },
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(Poster)
