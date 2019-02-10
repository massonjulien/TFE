import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';




class TextConnection extends React.Component {
  constructor()
  {
      super();

      this.state = {Email: '', Name: '', LastName: '', Photo:'aze', Tel : '', Password : '',  loading: false, disabled: false }
  }

  saveData = () =>
  {
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
              alert(responseJson);
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

        <View style = { styles.container }>
            <TextInput
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
              underlineColorAndroid = "transparent"
              placeholder = "Votre mot de passe"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Password: text })}
            />

            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = { this.saveData }>
                <Text style = { styles.btnText }>S'enregistrer</Text>
            </TouchableOpacity>

            {
                (this.state.loading)
                ?
                    (<ActivityIndicator size = "large" />)
                :
                    null
            }

        </View>
      );
  }
}


const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 25,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    textInput:
    {
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 16
    },

    Btn:
    {
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 25
    },

    btnText:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
});



export default TextConnection
