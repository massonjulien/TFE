import { connect } from 'react-redux'
import React from 'react'
import {StyleSheet, ActivityIndicator, Text, View, FlatList, Image, TouchableOpacity, TextInput} from 'react-native'
import Modal from "react-native-modal"

class Address extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
      isModalAdVisible : false, country : '', city : '', postal : '', address: '', num : ''
    };
  }

  addAd = () => {
    if(this.state.country != ''){
      if(this.state.city != ''){
        if(this.state.postal != ''){
          if(this.state.address !=''){
            if(this.state.num != ''){
              this.setState({ loading: true, disabled: true }, () =>
              {
                  fetch('https://olitot.com/DB/INC/add_address.php',
                  {
                      method: 'POST',
                      headers:
                      {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(
                      {
                        Email : this.props.email,
                        Country : this.state.country,
                        City : this.state.city,
                        Postal : this.state.postal,
                        Address : this.state.address,
                        Num : this.state.num
                      })

                  }).then((response) => response.json()).then((responseJson) =>
                  {
                      alert("Adresse ajoutée !");
                      this.setState({ loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });
                  }).catch((error) =>
                  {
                      //alert(error);
                      console.error(error);
                      this.setState({ loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });
                  });
              });

            } else {
              alert('Champ numéro vide!');
            }
          } else {
            alert('Champ adresse vide!');
          }
        } else {
          alert('Champ postal vide!');
        }
      } else {
        alert('Champ ville vide!');
      }
    } else {
      alert('Champ pays vide!');
    }
  }

  _toggleModalAd = () =>
      this.setState({ isModalAdVisible: !this.state.isModalAdVisible });

  render() {
      return (
        <View style={styles.container}>

        <Modal  isVisible={this.state.isModalAdVisible} >
          <View style={styles.modalContainerFirst}>
            <View style={styles.modalMain}>
                <Text style={styles.modalTxtIntro}>Ajouter une adresse</Text>
                <TextInput
                  underlineColorAndroid = "transparent"
                  placeholder = "Pays"
                  style = { styles.textInput }
                  onChangeText = {(text) => this.setState({ country: text })}
                />
                <TextInput
                  underlineColorAndroid = "transparent"
                  placeholder = "Ville"
                  style = { styles.textInput }
                  onChangeText = {(text) => this.setState({ city: text })}
                />
                <TextInput
                  underlineColorAndroid = "transparent"
                  placeholder = "Code Postal"
                  style = { styles.textInput }
                  onChangeText = {(text) => this.setState({ postal: text })}
                />
                <TextInput
                  underlineColorAndroid = "transparent"
                  placeholder = "Addresse"
                  style = { styles.textInput }
                  onChangeText = {(text) => this.setState({ address: text })}
                />
                <TextInput
                  underlineColorAndroid = "transparent"
                  placeholder = "Numéro"
                  style = { styles.textInput }
                  onChangeText = {(text) => this.setState({ num: text })}
                />
            </View>
            <TouchableOpacity style={styles.sendTouch} onPress={this.addAd}>
              <Text style={styles.btnModal}> Ajouter </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainerLast}>
            <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalAd}>
              <Text style={styles.btnModal}> Annuler </Text>
            </TouchableOpacity>
          </View>
        </Modal>


          <View style={styles.firstContainer}>
            <Text style={styles.Title}>Mes adresses</Text>
          </View>
          <View style={styles.flatContainer}>
             {this.displayAddress}
          </View>
          <View style={styles.lastContainer}>
            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress={this._toggleModalAd}>
                <Text style = { styles.btnText }>Nouvelle adresse</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = {() => this.props.navigation.navigate("Poster")}>
                <Text style = { styles.btnText }>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
      )

  }
}

const styles = StyleSheet.create({
  Title : {
      textAlign: 'center',
      fontSize: 20,
      color: 'grey',
      marginBottom: 10
  },
  textInput: {
      backgroundColor: 'white',
      height: 40,
      marginBottom: 15,
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      marginVertical: 5,
      alignSelf: 'stretch',
      padding: 8,
      fontSize: 16,
      marginHorizontal : 15
  },
  container : {
      flex : 1,
      marginHorizontal : 15,
  },
  firstContainer : {
    marginTop : 30,
    flex : 1,
  },
  flatContainer : {
    flex : 4,
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
  modalTxtIntro : {
    color: 'grey',
    margin : 10,
    fontSize : 20,
  },
  modalMain : {
    marginTop: 5,
    paddingVertical : 15,
    marginBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  modalContainerFirst : {
    backgroundColor : 'white',
    marginTop : 250,
    borderRadius: 10,
    borderWidth: 1,
  },
  modalContainerLast : {
    backgroundColor : 'white',
    marginTop : 10,
    marginBottom : 250,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnModal : {
    textAlign : 'center',
    color : '#6495ED',
    fontSize : 17,
    margin : 10,
  },
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}

export default connect(mapStateToPros)(Address)
