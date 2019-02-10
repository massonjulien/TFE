// Navigation/Navigation.js
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator  } from 'react-navigation'

import Poster from '../Components/Poster'
import Recherche from '../Components/Recherche'
import Connexion from '../Components/Connexion'
import Register from '../Components/Register'

const ConnexionStackNavigator = createStackNavigator({
  Connexion: {
    screen: Connexion
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "S'enregistrer"
    }
  }
})

const OlitotTabNavigator = createBottomTabNavigator({
  Recherche: {
    screen: Recherche,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Image/search.png')}
          style={styles.icon}/>
      }
    }
  },
  Poster: {
    screen: Poster,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Image/poster.png')}
          style={styles.icon}/>
      }
    }
  },
  Profil: {
    screen: ConnexionStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Image/profil.png')}
          style={styles.icon}/>
      }
    }
  }
},{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
})

const styles = StyleSheet.create({
  icon:{
    width:30,
    height:30
  }
})

export default createAppContainer(OlitotTabNavigator)
