// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import RF from "react-native-responsive-fontsize"


class FoodItem extends React.Component {

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

  whichRate(rate){
    if(rate != -1){
        return <AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={15}/>
    } else {
        return <Text></Text>
    }
  }

  render() {
    const { food, displayDetailFood } = this.props
    var today = this.todaysDate();
    var rate = this.whichRate(food.rate);
    if(food.qtavaible > 0 && food.date == today){
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
              <View style={styles.header_container_one}>
                  <Text style={styles.title_text}>{food.name}</Text>
              </View>
              <View style={styles.header_container_two}>
                {rate}
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.auteur}>{food.firstname} {food.lastname }</Text>
              <Text style={styles.nbPart}>{food.qtavaible} part(s) disponible à {food.price}€/part</Text>
              {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
            <View style={styles.horaireContainer}>
              <Text style={styles.nbPart}>Take away de {food.beginhour} à {food.endhour}</Text>
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
    height: 150,
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
  },
  header_container_one : {
    flex : 2,
  },
  header_container_two : {
    flex : 1,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: RF(2),
    flex: 4,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  nbPart: {
    fontWeight: 'bold',
    fontSize: RF(1.5),
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
    fontSize : RF(1.5),
  },
  imageRate: {

  }
})

export default FoodItem
