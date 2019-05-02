import { connect } from 'react-redux'
import React from 'react'
import {StyleSheet, ActivityIndicator, Text, View, FlatList, Image, TouchableOpacity, TextInput} from 'react-native'
import Modal from "react-native-modal"
import AddressItem from './Item/AddressItem'

class Address extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
      isModalAdNAN : false, isModalAdOk: false, isModalAdVisible : false, isModalAdPasOk : false, country : '', city : '', postal : '', address: '', num : ''
    };
  }

  _connectionReducer(data, value){
    const action = { type: value, value: data}
    this.props.dispatch(action)
  }

  _deleteAddress = (id) =>{
    this.setState({ loading: true, disabled: true }, () =>
    {
        fetch('https://olitot.com/DB/INC/postgres.php',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
              action : 'deleteAddress',
              id : id

            })

        }).then((response) => response.json()).then((responseJson) => {
            this.address();
        }).catch((error) => {

        });
    });
  }

  addAd = () => {
    if(this.state.country != '' && this.state.num != '' && this.state.city != '' && this.state.postal != '' && this.state.address !=''){
        if(!isNaN(this.num) || !isNaN(this.state.postal)){
          this.setState({ loading: true, disabled: true }, () =>
          {
              fetch('https://olitot.com/DB/INC/postgres.php',
              {
                  method: 'POST',
                  headers:
                  {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                  {
                    action : 'addAddress',
                    email : this.props.email,
                    country : this.state.country,
                    city : this.state.city,
                    zip : this.state.postal,
                    address : this.state.address,
                    num : this.state.num
                  })

              }).then((response) => response.json()).then((responseJson) =>
              {
                  this.address();
                  this.setState({loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });
              }).catch((error) =>
              {
                  //alert(error);
                  console.error(error);
                  this.setState({ loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });
              });
          });
        } else {
          this.setState({isModalAdVisible: !this.state.isModalAdVisible, isModalAdNAN : !this.state.isModalAdNAN });
        }
      } else {
        this.setState({isModalAdVisible: !this.state.isModalAdVisible, isModalAdPasOk : !this.state.isModalAdPasOk });
    }
  }

  address() {
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'getAddress',
          email : this.props.email
        })

    }).then((response) => response.json()).then((responseJson) => {
          this._connectionReducer(responseJson, 'address');
          this._connectionReducer(responseJson.length, 'nbAddress');
          //this.forceUpdate();

      })
      .catch((error) => {
        console.error(error);
      });
  }

  _toggleModalAd = () => {
    if(this.props.nbAddress >= 3){
      alert("Trop d'adresse. Veuillez en supprimer une pour en pouvoir en ajouter une nouvelle.")
    } else {
      this.setState({ isModalAdVisible: !this.state.isModalAdVisible });
    }
  }

  _toggleModalAdPasOk = () =>
      this.setState({ isModalAdVisible : !this.state.isModalAdVisible, isModalAdPasOk: !this.state.isModalAdPasOk});

  _toggleModalAdNAN = () =>
      this.setState({ isModalAdVisible : !this.state.isModalAdVisible, isModalAdNAN: !this.state.isModalAdNAN});


  render() {
    if(this.props.addressEmpty){
      return (
        <View style={styles.container}>

        <Modal  isVisible={this.state.isModalAdNAN} >
          <View style={styles.modalContainerFirst}>
            <View style={styles.modalMain}>
                <Text>Code postal ou numéro incorrect!</Text>
            </View>
            <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalAdNAN}>
              <Text style={styles.btnModal}> OK </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal  isVisible={this.state.isModalAdPasOk} >
          <View style={styles.modalContainerFirst}>
            <View style={styles.modalMain}>
                <Text>Un des champs est vide</Text>
            </View>
            <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalAdPasOk}>
              <Text style={styles.btnModal}> OK </Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
                  placeholder = "Adresse"
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
          <View style={styles.flatList}>
            <Text>Pas d'adresse enregistré</Text>
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
    } else {
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
                      placeholder = "Adresse"
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
          <View style={styles.flatList}>
            <FlatList
              data={this.props.dataAddress}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <AddressItem address={item} deleteAddress={this._deleteAddress}/>}
            />
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
  flatList : {
    flex : 4,
    borderTopColor : 'grey',
    borderTopWidth : 1,
  },
  lastContainer : {
    flex : 2,
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
    connected: state.connected,
    dataAddress : state.dataAddress,
    addressEmpty : state.addressEmpty,
    nbAddress : state.nbAddress,
  }
}

export default connect(mapStateToPros)(Address)
