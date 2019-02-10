import React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json



/*
class Connexion extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}> Veuillez vous connecter </Text>
        <TextInput style={styles.textInput} placeholder='Email'/>
        <TextInput style={styles.textInput} placeholder='Password'/>
        <Button title="Connexion" onPress={() => {}}/>
        <Button title="Register" onPress={() => this.props.navigation.navigate('Register')}/>
      </View>
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

class Register extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}> Veuillez vous enregistrez </Text>
        <TextInput style={styles.textInput} placeholder='Nom'/>
        <TextInput style={styles.textInput} placeholder='Prenom'/>
        <TextInput style={styles.textInput} placeholder='Email'/>
        <TextInput style={styles.textInput} placeholder='Password'/>
        <TextInput style={styles.textInput} placeholder='Vérification password'/>
        <Button title="S'enregistrer" onPress={() => {}}/>
      </View>
    );
  }
}

class Connected extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Connected</Text>
      </View>
    );
  }
}
*/
const RootStack = createStackNavigator(
  {
    Connexion: Connexion,
    Register: Register,
    Connected: Connected
  },
  {
    initialRouteName: 'Connexion',
  }
);

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
    marginBottom: 10
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 5
  }
})

if(Connected===false){
    const AppContainer = createAppContainer(RootStack);
}
const AppContainer = createAppContainer(RootStack);

export default class ConnexionScreen extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
