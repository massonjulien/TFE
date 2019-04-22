// Components/FilmDetail.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Picker, Table, TouchableOpacity } from 'react-native'


class MyOrderDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      food : undefined, qteArray : [], qte : '',
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





  _displayAnnonce() {
    {/* ici on définit une constante nommé film qui sera égale a this.state.film donc au lieu de faire
        this.state.film.qqchose on peut juste faire film.qqchose */}
    const { food } = this.state
    if (this.state.food != undefined) {
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
          <View style={styles.data_container}>
            <View style={styles.txt_profil}>
                <Text style={styles.identity}>{food.firstname} {food.lastname}{"\n"}</Text>
                <View style={styles.container_plat}>
                  <Text style={styles.identity}>{food.name}</Text>
                  <Text style={styles.description}>{food.description}</Text>
                  <Text style={styles.identity}>Vous avez commandé {food.qtbought} parts</Text>
                </View>
                <Text style={styles.identity}>Coordonnées du vendeur</Text>
                <Text style={styles.coordonnees}>{food.phone} </Text>
                <Text style={styles.coordonnees}>{food.address} {food.number}, {food.city} {food.zip}</Text>
            </View>
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
    marginBottom : '12%',
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
