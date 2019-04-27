// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'




class FoodItem extends React.Component {

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

  todaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = dd + '-' + mm + '-' + yyyy;

    return today;
  }

  render() {
    const { food, displayDetailFood } = this.props
    var hour = food.date;
    var today = this.todaysDate();
    console.log(today);
    hour = hour.split('__');
    var beginHour = hour[1];
    var endHour = hour[2];
    console.log(hour[0])
    if(food.qtavaible > 0 && hour[0] == today){
      return (
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailFood(food.id)}>
          <Image
            style={styles.image}
            source={{uri : food.advertpicture}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{food.name}</Text>
              <Text style={styles.rate}>Rate {food.rate}/5</Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.auteur}>{food.firstname} {food.lastname }</Text>
              <Text style={styles.nbPart}>{food.qtavaible} part(s) disponible à {food.price}€/part</Text>
              {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
            <View style={styles.horaireContainer}>
              <Text style={styles.nbPart}>Take away de {beginHour} à {endHour}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 130,
    flexDirection: 'row'
  },
  horaireContainer : {
    flex : 3,
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
    flex: 4,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  nbPart: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666666'
  },
  bodyContainer: {
    flex: 3,
  },
  auteur: {
    fontStyle: 'italic',
    color: '#666666',
    flex: 3
  },
  rate: {
    flex: 2,
    fontSize : 15,
  },
  imageRate: {

  }
})

export default FoodItem
