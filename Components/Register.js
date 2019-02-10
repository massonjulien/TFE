import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, KeyboardAvoidingView, ScrollView, Image} from 'react-native';

class Register extends React.Component {
  constructor(){
      super();

      this.state = {Email: '', Name: '', LastName: '', Photo:'aze', Tel : '', Password : '', VerifPassword : '',  loading: false, disabled: false }
  }

  createNewUser = () =>  {

          fetch('https://olitot.com/DB/INC/testEmail.php',
          {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                Email : this.state.Email,
              })

          }).then((response) => response.json()).then((responseJson) =>
          {
              if(this.state.Email === '') {
                alert("Champ email vide!")
              } else if (this.state.Name === ''){
                alert("Champ prénom vide!")
              } else if (this.state.LastName === ''){
                alert("Champ nom vide!")
              } else if(this.state.Tel === ''){
                alert("Champ téléphone vide!")
              } else if(this.state.Password === ''){
                alert("Champ mot de passe vide!")
              } else if(this.state.VerifPassword === ''){
                alert("Champ vérification de mot de passe vide!")
              } else if(responseJson){
                alert("Email déjà existant!")
              } else if(this.state.Password.length < 8){
                alert("Veuillez indiquer un mot de passe d'au moins 8 caractères!")
              } else {
                if(this.state.Password === this.state.VerifPassword){
                  this.saveData();
                } else {
                  alert("Mot de passe différents!");
                }
              }
          }).catch((error) =>
          {
              //alert(error);
              console.error(error);
          });

  }

  saveData = () =>  {
      this.setState({ loading: true, disabled: true }, () =>
      {
          fetch('https://olitot.com/DB/INC/user_registration.php',
          {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                Email : this.state.Email,

                Name: this.state.Name,

                LastName: this.state.LastName,

                Tel: this.state.Tel,

                Password: this.state.Password
              })

          }).then((response) => response.json()).then((responseJson) =>
          {
              this.props.navigation.navigate("Connexion");
              alert("Vous êtes inscrit! Vous pouvez maintenant vous connecter");
              this.setState({ loading: false, disabled: false });
          }).catch((error) =>
          {
              //alert(error);
              console.error(error);
              this.setState({ loading: false, disabled: false });
          });
      });
  }

  render()
  {
      return(

        <KeyboardAvoidingView  style={styles.container} behavior="padding" enabled>

          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <Image
              style={styles.img}
              source={require('../Image/olitoLogo.png')}
            />
            <TextInput
              textContentType = "emailAddress"
              keyboardType = "email-address"
              autoComplete = "email"
              underlineColorAndroid = "transparent"
              placeholder = "Votre Email"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Email: text })}
            />

            <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Votre prénom"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Name: text })}
            />

            <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Votre nom"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ LastName: text })}
            />

            <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Votre numéro de téléphone"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Tel: text })}
            />

            <TextInput
              secureTextEntry={true}
              underlineColorAndroid = "transparent"
              placeholder = "Votre mot de passe"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Password: text })}
            />
            <TextInput
              secureTextEntry={true}
              underlineColorAndroid = "transparent"
              placeholder = "Retapez votre mot de passe"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ VerifPassword: text })}
            />

            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = { this.createNewUser }>
                <Text style = { styles.btnText }>S'enregistrer</Text>
            </TouchableOpacity>

            {
                (this.state.loading)
                ?
                    (<ActivityIndicator size = "large" />)
                :
                    null
            }
          </ScrollView>
        </KeyboardAvoidingView>
      );
  }
}


const styles = StyleSheet.create(
{
    container: {
        overflow: 'scroll',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginHorizontal: 0,
        marginVertical:0,
        paddingTop: 0//(Platform.OS == 'ios') ? 20 : 0
    },
    img: {
      width:105,
      height:100,
      paddingHorizontal: 5,
      paddingVertical: 0,
      marginHorizontal: 5,
      marginVertical:0,
    },
    scroll: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom:45,
      paddingVertical: 0,
      marginHorizontal: 0,
      marginVertical:0,
    },
    textInput: {
        backgroundColor: 'white',
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        alignSelf: 'stretch',
        paddingTop: 8,
        fontSize: 16
    },
    Btn: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 25
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
});



export default Register
