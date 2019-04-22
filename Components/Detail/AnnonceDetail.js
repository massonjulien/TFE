// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'


class AnnonceDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      annonce : undefined
    }
  }

  componentDidMount() {
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'displayAdverts',
          id : this.props.navigation.state.params.id
        })

    }).then((response) => response.json()).then((responseJson) => {
        this.setState({
          annonce : responseJson[0]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _displayAnnonce() {
    {/* ici on définit une constante nommé film qui sera égale a this.state.film donc au lieu de faire
        this.state.film.qqchose on peut juste faire film.qqchose */}
    const { annonce } = this.state
    if (this.state.annonce != undefined) {
      return (
        <View style={styles.main_container}>
          <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{uri : annonce.advertpicture}}
            />
          </View>
          <View style={styles.data_container}>
            <Text style={styles.plat}>{annonce.name}</Text>
            <Text style={styles.prix}>{annonce.price}€/Part</Text>
            <Text style={styles.qt}>{annonce.qtavaible} / {annonce.qttotal} restantes</Text>
            <Text style={styles.qt}>{annonce.address} {annonce.number}, {annonce.city} {annonce.zip}</Text>
            <Text style={styles.desc}>{annonce.description}</Text>
          </View>
        </View>
      )
    }
  }

  render() {

    return (
      <View style={styles.main}>
        {this._displayAnnonce()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main : {
    flex : 1,
  },
  main_container : {
    flex : 1,
  },
  data_container : {
    flex : 4,
    paddingLeft : 20,
    paddingTop : 20,
  },
  image_container : {
    height : 350,
    flex : 2,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
  },
  image : {
    flex : 1
  },
  plat : {
    fontSize : 23,
    color : 'grey',
  },
  prix : {
    fontSize : 23,
    color : 'grey',
    marginTop : 10,
  },
  qt : {
    fontSize : 23,
    color : 'grey',
    marginTop : 10,
  },
  desc : {
    color : 'grey',
    marginTop : 10,
  }


})

export default AnnonceDetail
