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
          food : responseJson
        });
        console.log(responseJson);

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

            </View>
            <View style={styles.cmd}>
              <Picker
                selectedValue={this.state.qte}
                style={{height: 50, width: 300}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({qte: itemValue})
                }>
                {qteDispItems}
              </Picker>
              <TouchableOpacity
                activeOpacity = { 0.8 } style = { styles.btn }
                onPress={this.commander}>
                  <Text style = { styles.btnText }>Commander</Text>
              </TouchableOpacity>
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
    borderBottomColor : 'grey',
    borderBottomWidth : 2.5,
    alignItems: 'center',
  },
  data_container : {
    flex : 5,
    paddingTop: 100,
  },
  image : {
    height: '100%',
    width:'100%',
    position : 'absolute',
  },
  profil : {
    borderWidth:2.5,
    borderColor:'grey',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
    marginTop : '42%',
  },
  txt_profil : {
    flex : 1,
    flexDirection: 'row'
  },
  cmd : {
    flex : 1
  },
  profil_name : {
    flex : 1,
  },
  profil_rate : {
    flex : 1,
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
  btn : {
    marginHorizontal : 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom : 10,
  }

})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(MyOrderDetail)
