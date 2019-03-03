// Navigation/Navigation.js
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator  } from 'react-navigation'


import Poster from '../Components/Poster'
import Recherche from '../Components/Recherche'
import Connexion from '../Components/Connexion'
import Register from '../Components/Register'
import Commander from '../Components/Commander'


const ConnectionNagivator = createStackNavigator({
  Connexion: {
    screen: Connexion,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  }
});

const OlitotTabNavigator = createBottomTabNavigator({
  Recherche: {
    screen: Recherche,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIcon
          : styles.inactiveIcon
        const image = focused
          ? require('../Image/selectedSearch.png')
          : require('../Image/unselectedSearch.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  },
  Commander: {
    screen: Commander,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIcon
          : styles.inactiveIcon
        const image = focused
          ? require('../Image/selectedCommande.png')
          : require('../Image/unselectedCommande.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  },
  Poster: {
    screen: Poster,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIconPoster
          : styles.inactiveIconPoster
        const image = focused
          ? require('../Image/selectedPoster.png')
          : require('../Image/unselectedPoster.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  },
  Profil: {
    screen: ConnectionNagivator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIcon
          : styles.inactiveIcon
        const image = focused
          ? require('../Image/selectedProfil.png')
          : require('../Image/unselectedProfil.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  }
},{
  tabBarOptions: {
    //activeBackgroundColor: '#DDDDDD',
    //inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
})

const styles = StyleSheet.create({
  icon:{
    width:30,
    height:30
  },
  activeIconPoster : {
    width: 45,
    height:45
  },
  inactiveIconPoster : {
    width: 35,
    height:35
  },
  activeIcon:{
    width: 40,
    height:40
  },
  inactiveIcon:{
    width:30,
    height:30
  }
})
const mapStateToProps = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default createAppContainer(OlitotTabNavigator)
