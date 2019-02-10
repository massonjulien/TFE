import React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json



class Connexion extends React.Component {

  constructor(){
      super();

      this.state = {Email: '', Password: '',  loading: false, disabled: false }
  }

  connexion = () =>  {
    this.setState({ loading: true, disabled: true }, () => {
          fetch('https://olitot.com/DB/INC/testUser.php', {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                Email : this.state.Email,
                Password : this.state.Password
              })

          }).then((response) => response.json()).then((responseJson) => {
              if(responseJson){
                //ici le code de connexion
                alert('connexion');
                this.setState({ loading: false, disabled: false });
              } else {
                alert('Identifiant ou mot de passe incorrect');
                this.setState({ loading: false, disabled: false });
              }
          }).catch((error) => {
              //alert(error);
              console.error(error);
          });
    });
  }


  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image
            style={styles.img}
            source={require('../Image/olitoLogo.png')}
          />
          <Text style={styles.text}> Veuillez vous connecter </Text>
          <TextInput
            textContentType = "emailAddress"
            keyboardType = "email-address"
            autoComplete = "email"
            underlineColorAndroid = "transparent"
            placeholder = "Email"
            style = { styles.textInput }
            onChangeText = {(text) => this.setState({ Email: text })}
          />
          <TextInput
            secureTextEntry={true}
            underlineColorAndroid = "transparent"
            placeholder = "Mot de passe"
            style = { styles.textInput }
            onChangeText = {(text) => this.setState({ Password: text })}
          />

          <TouchableOpacity
            activeOpacity = { 0.8 } style = { styles.Btn }
            onPress = { this.connexion }>
              <Text style = { styles.btnText }>Connexion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity = { 0.8 } style = { styles.Btn }
            onPress = {() => this.props.navigation.navigate("Register")}>
              <Text style = { styles.btnText }>S'enregistrer</Text>
          </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
  _quoiReturn(connected){
    if(connected===false){
      console.log("false")
    }
    else if (connected === true) {
      console.log("true")
    }
  }

}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
    marginBottom: 10
  },
  container: {
      overflow: "scroll",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      paddingHorizontal: 25,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0
  },
  img: {
    width:105,
    height:100,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginHorizontal: 5,
    marginVertical:0,
  },
  textInput: {
      backgroundColor: 'white',
      height: 40,
      borderWidth: 1,
      borderColor: 'grey',
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
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  }
})

export default Connexion
