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

componentDidMount() {
  return fetch('https://olitot.com/DB/INC/recup_data.php?rq=' + this.props.email)
    .then((response) => response.json()).then((responseJson) => {
      this.setState({
        dataSource : responseJson[0]
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
          source={{uri: 'https://olitot.com/DB/USER/inconnu.jpg'}}
        />
        <View style={styles.rate}>
          <Text>Ici le rate</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text> Ici l'email </Text>
      </View>

      <View style={styles.container}>
        <Text> Ici le Nom & prénom </Text>
      </View>

      <View style={styles.container}>
        <Text> Ici le Tel </Text>
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
