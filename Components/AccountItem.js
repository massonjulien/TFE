// Components/FilmItem.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, ActivityIndicator, ListView, Text, View, Alert, FlatList, Image, TouchableOpacity } from 'react-native'


class AccountItem extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    isLoading: true, dataSource: [],
  };
}

rate(nb){
  if(nb >= 0 && nb < 1){
     return require('../Image/noStar.jpg')
  } else if(nb >= 1 && nb < 2){
     return require('../Image/oneStar.jpg')
  } else if(nb >= 2 && nb < 3){
     return require('../Image/twoStar.jpg')
  } else if(nb >= 3 && nb < 4){
     return require('../Image/threeStar.jpg')
  } else if(nb >= 4 && nb < 5){
     return require('../Image/fourStar.jpg')
  } else if(nb == 5){
     return require('../Image/fiveStar.jpg')
  } else if(nb == 'null'){

  }
}

componentDidMount() {
  return fetch('https://olitot.com/DB/INC/recup_data.php?rq=' + this.props.email)
    .then((response) => response.json()).then((responseJson) => {
      this.setState({
        dataSource : responseJson[0],
      });
    })
    .catch((error) => {
      console.error(error);
    });
}


render() {
  return (

    <View style={styles.mainContainer}>
      <View style={styles.firstContainer}>
        <Image
          style={styles.image}
          source={{uri: this.state.dataSource['Photo']}}
        />
        <View style={styles.rate}>
          <Image
            style={styles.imgRate}
            source={this.rate(this.state.dataSource['Rate'])}
          />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.enoncs}> Email  </Text>
        <Text style={styles.datas}> {this.state.dataSource['Email']}</Text>
      </View>

      <View style={styles.container}>
        <Text> {this.state.dataSource['Name']} {this.state.dataSource['LastName']} </Text>
      </View>

      <View style={styles.container}>
        <Text> {this.state.dataSource['Tel']} </Text>
      </View>

      <View style={styles.container}>
        <Text> Ici le modifier le password </Text>
      </View>
    </View>
  );
}

}

const styles = StyleSheet.create({
  mainContainer : {
    flex : 1,
    backgroundColor: '#eee',
  },
  imgRate : {
    width : 200,
    height : 37,
    marginTop : 10,
  },
  
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
  image : {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:100,
    flex : 1,
  },
  rate : {
    flex : 1,
  },
  firstContainer : {
    marginTop: 40,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container : {
    flex : 1,
    paddingHorizontal: 25,
  }
});

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(AccountItem)
