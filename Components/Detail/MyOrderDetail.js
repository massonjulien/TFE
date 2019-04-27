// Components/FilmDetail.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Picker, Table, TouchableOpacity } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import { Rating, AirbnbRating } from 'react-native-ratings';

class MyOrderDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      food : undefined, qteArray : [], qte : '', rate : undefined
    }
  }

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



  componentDidMount() {
    console.log(this.props.navigation.state.params.idadvert);
    console.log(this.props.navigation.state.params.id);
    console.log(this.props.email);
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'displayMyOrder',
          id : this.props.navigation.state.params.id,
          idadvert : this.props.navigation.state.params.idadvert,
          email : this.props.email
        })

    }).then((response) => response.json()).then((responseJson) => {
        //this.countQteDisp(responseJson.qtavaible)
        this.setState({
          food : responseJson[0]
        });
        console.log(responseJson[0]);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  checkSender(id){
      console.log(id);
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'checkReservation',
          id : id,
          who : 'buyer'
        })

    }).then((response) => response.json()).then((responseJson) => {
        if(responseJson == true){
          this.componentDidMount();
          alert("N'oubliez pas de noter votre cuisiniez après votre dégustation!")
        } else {
          alert("Une erreur s'est produite");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  validateRate(){
    if(this.state.rate != undefined){
      console.log(this.props.navigation.state.params.id);
      return fetch('https://olitot.com/DB/INC/postgres.php', {
          method: 'POST',
          headers:
          {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
          {
            action : 'checkRate',
            id : this.props.navigation.state.params.id,
            rate : this.state.rate
          })

      }).then((response) => response.json()).then((responseJson) => {
          if(responseJson == true){
            this.componentDidMount();
            alert("Note validée!")
          } else {
            alert("Une erreur s'est produite");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  ratingCompleted(rating) {
    this.setState({rate : rating});
    console.log(this.state.rate);
  }

  whichRate(rate, validated, firstname){
    if(validated == 'true'){
      if(rate == null){
        return <View style={styles.rate_container}><Text style={styles.txt_rate}>Notez {firstname} !</Text><AirbnbRating  count={5} onFinishRating={this.ratingCompleted.bind(this)} reviews={["Oula...", "M'ouais", "Pas mal !", "Très bon !", "Incroyable !"]}  defaultRating={2.5}  size={36}/><Button onPress={this.validateRate.bind(this)} containerStyle={styles.button_rate} title="Confirmer ?"  type="solid"/></View>
      } else {
        return <View style={styles.rate_container}><Text style={styles.txt_rate}>Vous avez noté {firstname} !</Text><AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={36}/></View>
      }
    } else {
        return <Text></Text>;
    }
  }

  _displayAnnonce() {
    {/* ici on définit une constante nommé film qui sera égale a this.state.film donc au lieu de faire
        this.state.film.qqchose on peut juste faire film.qqchose */}
    const { food } = this.state

    if (this.state.food != undefined) {
      const rating = this.whichRate(food.ratereserv, food.validatedbuyer, food.firstname);
      if(food.validatedbuyer == 'true'){
        this.check = true;
      } else {
        this.check = false;
      }
      return (
        <View style={styles.main_container}>
          <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{uri : food.advertpicture}}
            />
            <Image
              style={styles.profil}
              source={{uri : food.profilepicture}}
            />
          </View>
          <View fillViewport="true" style={styles.data_container}>
            <ScrollView style={styles.txt_profil}>
                <Text style={styles.identity}>{food.firstname} {food.lastname}{"\n"}</Text>
                <View style={styles.container_plat}>
                  <Text style={styles.identity}>{food.name}</Text>
                  <Text style={styles.description}>{food.description}</Text>
                  <Text style={styles.identity}>Vous avez commandé {food.qtbought} parts</Text>
                </View>
                <Text style={styles.identity}>Coordonnées du vendeur</Text>
                <Text style={styles.coordonnees}>{food.phone} </Text>
                <Text style={styles.coordonnees}>{food.address} {food.number}, {food.city} {food.zip}</Text>
                <CheckBox style={styles.checkbox} checked={this.check} onPress={() => this.checkSender(this.props.navigation.state.params.id)} title={"Avez vous recu votre plat?"}/>
                {rating}
            </ScrollView>
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
  main  : {
    flex : 1,
  },
  main_container : {
    flex : 1,
  },
  image_container : {
    flex : 3,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
    alignItems: 'center',
  },
  button_rate : {
    marginTop:20,
    marginHorizontal:20,
    backgroundColor : 'grey'
  },
  txt_rate : {
    color : 'grey',
    fontSize : 18,
    marginHorizontal : '2%',
    textAlign:'center',
    marginBottom : '2%',
  },
  rate_container : {
    marginTop : 5,
    marginBottom : 5,
    borderTopColor : 'black',
    borderTopWidth : 1,
    paddingVertical : 20,
    textAlign : 'center'
  },
  data_container : {
    flex : 5,
    paddingTop: 20,
  },
  image : {
    height: '100%',
    width:'100%',
    position : 'absolute',
  },
  profil : {
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
    marginTop : '51%',
  },
  txt_profil : {
    //marginHorizontal : '2%',
    flex : 1,
    //marginBottom : '12%',

  },
  rate : {
    width : 20,
    height : 23,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
  description : {
    marginHorizontal : '2%',
  },
  btn : {
    marginHorizontal : 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom : 10,
  },
  identity : {
    color : 'grey',
    fontSize : 18,
    marginHorizontal : '2%',
  },
  coordonnees : {
    marginLeft : '10%',
    fontSize : 16,
    marginHorizontal : '2%',
  },
  container_plat : {
    marginTop : '5%',
    marginBottom : '5%',
    paddingTop : '5%',
    paddingBottom : '5%',
    borderTopColor : 'grey',
    borderTopWidth : 1,
    borderBottomColor : 'grey',
    borderBottomWidth : 1,
  }

})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(MyOrderDetail)
