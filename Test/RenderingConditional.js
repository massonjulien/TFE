import React from 'react'
import { StyleSheet, Text, View, LoginButton, LogoutButton, Button } from 'react-native'





class RederingConditional extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isConnected : false
    }
  }

  render() {
    const isConnected =
      <Button
        onPress={() => this._logOut()}
        title="LogOut"
        color="#841584"
      />;
    const isNotConnected =
      <Button
        onPress={() => this._logIn()}
        title="LogIn"
        color="#841584"
      />;

    let message;

    if (this.state.isConnected) {
       message = isConnected
    } else {
       message = isNotConnected
    }

    return (<View style={styles.view}>{message}</View>);
  }

  _logOut(){
    this.setState({isConnected: false})

  }

  _logIn(){
    this.setState({isConnected: true})

  }
}


const styles = StyleSheet.create({
  view: {
    margin: 20
  }
})

export default RederingConditional
