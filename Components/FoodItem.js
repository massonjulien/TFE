// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'




class FoodItem extends React.Component {

  _calculRate = (nb) =>{
    if (nb == 0){
      return '../Image/noStar.jpg'
    }
    else if(nb > 0 && nb < 1){
      return '../Image/oneStar.jpg'
    }
    else if(nb >= 1 && nb < 2){
      return '../Image/twoStar.jpg'
    }
    else if(nb >= 2 && nb < 3){
      return '../Image/threeStar.jpg'
    }
    else if(nb >= 4 && nb < 5){
      return '../Image/fourStar.jpg'
    }
    else if(nb == 5){
      return '../Image/fiveStar.jpg'
    }
  }



  render() {
    const food = this.props.food
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={require('../Image/food/spaghettiBolognese.jpg')}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{food.nom}</Text>
            <Text style={styles.nbPart}>{food.prix}€</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.auteur}>{food.auteur}</Text>
            <Image
              style={styles.rate}
              source={require('../Image/fourStar.jpg')}
              />
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 130,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: 'gray'
  },
  imageRate: {
    width: 100,
    height: 20,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  nbPart: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666666'
  },
  bodyContainer: {
    flex: 7,
    flexDirection: 'row'
  },
  auteur: {
    fontStyle: 'italic',
    color: '#666666',
    flex: 3
  },
  rate: {
    flex: 4,
    width: 20,
    height: 20
  },
  imageRate: {

  }
})

export default FoodItem
