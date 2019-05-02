// Components/FilmItem.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, ActivityIndicator, ScrollView, Button, ListView, Text, View, Alert, FlatList, Image, TouchableOpacity, TextInput } from 'react-native'
import Modal from "react-native-modal"
import { Rating, AirbnbRating } from 'react-native-ratings';

class AccountItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, dataSource: [],isModalTelNotOk : false, isModalNotOkPwd : false, isModalPwdToShort : false, isModalPwdWrong : false, isModalPwdNotSame : false, isModalTelVisible: false, isModalPwdVisible:false, isModalOkPwd : false, isModalPhotoVisible : false, isModalTelChangedVisible : false,
      Tel : '', Password : '', newTel : '',  oldPwd : '', verifPwd : '', newPwd : '', Photo : 'x',
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

  rate(nb){
    if(nb >= 0 && nb < 1){
       return require('../../Image/noStar.jpg')
    } else if(nb >= 1 && nb < 2){
       return require('../../Image/oneStar.jpg')
    } else if(nb >= 2 && nb < 3){
       return require('../../Image/twoStar.jpg')
    } else if(nb >= 3 && nb < 4){
       return require('../../Image/threeStar.jpg')
    } else if(nb >= 4 && nb < 5){
       return require('../../Image/fourStar.jpg')
    } else if(nb == 5){
       return require('../../Image/fiveStar.jpg')
    } else if (nb == -1 ) {

    }
  }

  countPassword(pass = ""){
    let x = "";
    for(let i = 0; i < pass.length; i++){
      x += "*"
    }
    return x
  }

  _changeTel = () => {
    if(this.state.newTel.length < 9 || this.state.newTel.length > 10 || isNaN(this.state.newTel)){
      this.setState({isModalTelVisible : !this.state.isModalTelVisible, isModalTelNotOk : !this.state.isModalTelNotOk});
    } else {
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
                action : 'changePhone',
                email : this.state.dataSource['email'],
                phone : this.state.newTel
              })

          }).then((response) => response.json()).then((responseJson) =>
          {
              this.setState({ isLoading : false, isModalTelVisible: !this.state.isModalTelVisible, isModalTelChangedVisible : !this.state.isModalTelChangedVisible, Tel : this.state.newTel, newTel : '' });
          }).catch((error) =>
          {
              //alert(error);
              console.error(error);
              this.setState({ isLoading : false, isModalPwdVisible : !this.state.isModalPwdVisible, isModalNotOkPwd : !this.state.isModalNotOkPwd, loading: false, disabled: false });
          });
      });
    }
  }

  _changePwd = () => {
    this.setState({isLoading: true}, () => {
          fetch('https://olitot.com/DB/INC/postgres.php', {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                action : 'testUser',
                email : this.state.dataSource['email'],
                password : this.state.oldPwd,
              })
          }).then((response) => response.json()).then((responseJson) => {
              if(responseJson){
                if(this.state.newPwd == this.state.verifPwd){
                  if(this.state.newPwd.length > 8){
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
                          action : 'changePassword',
                          email : this.state.dataSource['email'],
                          password : this.state.newPwd,
                        })

                    }).then((response) => response.json()).then((responseJson) =>
                    {
                        //alert("Mot de passe changé!");
                        this.setState({ isLoading : false, isModalOkPwd : !this.state.isModalOkPwd, isModalPwdVisible: !this.state.isModalPwdVisible, Password : this.state.newPwd, oldPwd : '', verifPwd : '', newPwd : '' });
                    }).catch((error) =>
                    {
                        //alert(error);
                        //console.error(error);
                        this.setState({ isLoading : false, isModalPwdVisible : !this.state.isModalPwdVisible, isModalNotOkPwd : !this.state.isModalNotOkPwd, loading: false, disabled: false });
                    });
                  } else {
                      this.setState({isLoading : false, isModalPwdToShort : !this.state.isModalPwdToShort,  isModalPwdVisible : !this.state.isModalPwdVisible});
                  }
                } else {
                  this.setState({isLoading : false, isModalPwdNotSame : !this.state.isModalPwdNotSame,  isModalPwdVisible : !this.state.isModalPwdVisible});
                }
              } else {
                this.setState({isLoading : false,  isModalPwdWrong : !this.state.isModalPwdWrong,  isModalPwdVisible : !this.state.isModalPwdVisible});
              }
          }).catch((error) => {
              //alert(error);
              this.setState({isLoading : false})
              console.error(error);
          });
    });
  }

  _toggleModalTelNotOk = () =>
      this.setState({ isModalTelVisible : !this.state.isModalTelVisible, isModalTelNotOk: !this.state.isModalTelNotOk});

  _toggleModalPwdNotSame = () =>
      this.setState({ isModalPwdVisible : !this.state.isModalPwdVisible, isModalPwdNotSame: !this.state.isModalPwdNotSame});

  _toggleModalPwdToShort = () =>
          this.setState({ isModalPwdVisible : !this.state.isModalPwdVisible, isModalPwdToShort: !this.state.isModalPwdToShort});

  _toggleModalPwdWrong = () =>
      this.setState({ isModalPwdVisible : !this.state.isModalPwdVisible, isModalPwdWrong: !this.state.isModalPwdWrong});

  _toggleModalNotOkPwd = () =>
      this.setState({ isModalNotOkPwd: !this.state.isModalNotOkPwd});

  _toggleModalOkPwd = () =>
      this.setState({ isModalOkPwd: !this.state.isModalOkPwd});

  _toggleModalTel = () =>
      this.setState({ isModalTelVisible: !this.state.isModalTelVisible, newTel : '' });

  _toggleModalTelChanged = () =>
      this.setState({ isModalTelChangedVisible: !this.state.isModalTelChangedVisible });

  _toggleModalPwd = () =>
      this.setState({ isModalPwdVisible: !this.state.isModalPwdVisible, oldPwd : '', newPwd : '', verifPwd : '' });

  _toggleModalPhoto = () =>
      this.setState({ isModalPhotoVisible: !this.state.isModalPhotoVisible });


componentDidMount() {
  this.setState({isLoading : true});
  return fetch('https://olitot.com/DB/INC/postgres.php', {
      method: 'POST',
      headers:
      {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      {
        action : 'getData',
        email : this.props.email
      })

  }).then((response) => response.json()).then((responseJson) => {
      this.setState({
        dataSource : responseJson[0],
        Tel : responseJson[0].phone,
        Password : responseJson[0].password,
        Photo : responseJson[0].profilepicture,
        isLoading : false
      });
    })
    .catch((error) => {
      console.error(error);
      this.setState({isLoading : false})
    });
}

whichRate(rate){
  if(rate != -1){
      return <AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={15}/>
  } else {
      return <Text></Text>
  }
}

render() {
  var rate = this.whichRate(this.state.dataSource['rate']);
  return (
    <View style={styles.mainContainer}>
      {this._displayLoading()}
      <Modal  isVisible={this.state.isModalTelNotOk} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text>Le numéro entré est incorrect!</Text>
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalTelNotOk}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalOkPwd} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text>Votre mot de passe a changé!</Text>
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalOkPwd}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalPwdToShort} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text>Le nouveau mot de passe indiqué est trop court!</Text>
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPwdToShort}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalPwdWrong} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text>Le mot de passe entré est incorrect</Text>
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPwdWrong}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalPwdNotSame} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text>Nouveaux mots de passe non identiques</Text>
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPwdNotSame}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalNotOkPwd} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text>Une erreur s'est produite</Text>
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalNotOkPwd}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalTelVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text style={styles.modalTxtIntro}>Changer de numéro de téléphone</Text>
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Nouveau numéro"
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ newTel: text })}
              />
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._changeTel}>
            <Text style={styles.btnModal}> CHANGER </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalTel}>
            <Text style={styles.btnModal}> CANCEL </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalTelChangedVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text style={styles.modalTxtIntro}>Votre numéro de téléhpone a changé !</Text>
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalTelChanged}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalPwdVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text style={styles.modalTxtIntro}>Changer le mot de passe</Text>
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Ancien mot de passe"
                secureTextEntry={true}
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ oldPwd: text })}
              />
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Nouveau mot de passe"
                secureTextEntry={true}
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ newPwd: text })}
              />
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Retapez le nouveau mot de passe"
                secureTextEntry={true}
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ verifPwd: text })}
              />
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._changePwd}>
            <Text style={styles.btnModal}> CHANGER </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPwd}>
            <Text style={styles.btnModal}> CANCEL </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalPhotoVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text style={styles.modalTxtIntro}>Changer la photo du profil</Text>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={styles.image}
                  source={{uri: this.state.Photo}}
                />
              </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={() => {}}>
            <Text style={styles.btnModal}> CHANGER </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPhoto}>
            <Text style={styles.btnModal}> CANCEL </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.firstContainer}>
        <TouchableOpacity style={styles.image} onPress={this._toggleModalPhoto}>
          <Image
            style={styles.image}
            source={{uri: this.state.Photo}}
          />
        </TouchableOpacity>
        <View style={styles.rate}>
          {rate}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.enoncs}> Email </Text>
        <View style={styles.datas}>
          <Text style={styles.datasText}> {this.state.dataSource['email']}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.enoncs}> Identité </Text>
        <View style={styles.datas}>
          <Text style={styles.datasText}> {this.state.dataSource['firstname']} {this.state.dataSource['lastname']} </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.container} onPress={this._toggleModalTel}>
          <Text style={styles.enoncs}> Téléphone </Text>
          <View style={styles.datas}>
           <Text style={styles.datasText}>{this.state.Tel} </Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={this._toggleModalPwd}>
        <Text style={styles.enoncs}> Password </Text>
        <View style={styles.datas}>
         <Text style={styles.datasText}> {this.countPassword("coucoucu")} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

}

const styles = StyleSheet.create({
  mainContainer : {
    flex : 1,
    backgroundColor: 'white',
  },
  modalMain : {
    marginTop: 5,
    paddingVertical : 15,
    marginBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  imgRate : {
    width : 200,
    height : 37,
    marginTop : 10,
  },
  modalEnoncs : {
    marginLeft : 15,
  },
  modalTxtIntro : {
    color: 'grey',
    margin : 10,
    fontSize : 20,
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
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
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
  rate : {
    flex : 1,
  },
  firstContainer : {
    marginTop: 40,
    flex: 2,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  },
  container : {
    flex : 1,
    height : 100,
    marginHorizontal: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5
  },
  enoncs : {
    color : 'grey',
    marginHorizontal : 15,
  },
  datas : {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datasText : {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize : 15,
    fontStyle : 'italic',
  }
});

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(AccountItem)
