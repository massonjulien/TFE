import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker, Image, ScrollView } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class NewPost extends React.Component {

  constructor(){
      super();
      this.state = {nom : '', qte : '0', description :'', photo : '', prix : ''}
  }

  _connectionReducer(data, value){
    const action = { type: value, value: data}
    this.props.dispatch(action)
  }

  saveData = () => {
    console.log(this.state.value);
    if(this.state.value == undefined){
      alert("Choissisez une adresse pour l'annonce!");
    } else {
      if(this.state.nom != '' && this.state.description != '' && this.state.prix != '' && this.state.qte != ''){
        this.setState({ loading: true, disabled: true }, () =>
        {
            fetch('https://olitot.com/DB/INC/postgres.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  action :'addAdvert',
                  email : this.props.email,
                  nom : this.state.nom,
                  description : this.state.description,
                  prix : this.state.prix,
                  qte : this.state.qte,
                  idAddress : this.state.value
                })

            }).then((response) => response.json()).then((responseJson) =>
            {
                if(responseJson == true){
                  this.annonce();
                  this.setState({nom : '', description : '', prix : '', qte : '' }, () => this.props.navigation.navigate("Poster"));
                } else {
                  alert("une erreur s'est produite");
                }

            }).catch((error) =>
            {
                //alert(error);
                console.error(error);
                this.setState({ loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });
            });
        });
      }else{
        alert('Tous les champs doivent être remplis');
      }
    }
  }

  annonce() {
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'getAdverts',
          email : this.props.email
        })

    }).then((response) => response.json()).then((responseJson) => {
        if(responseJson != false ){
          this._connectionReducer(responseJson, 'annonce');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

  listingAddress(){
    var arr = [];
    if(this.props.nbAddress > 0){
      for(var i =0; i < this.props.nbAddress; i++){
        var temp = '';
        temp += this.props.address[i].address;
        temp += this.props.address[i].number;
        temp += ', ' + this.props.address[i].zip;
        arr.push({label: temp, value:this.props.address[i].id});
      }
      return arr;
    }

  }


  render() {
    var radio_props = this.listingAddress();
    //console.log(radio);
    //console.log(this.props.address);


    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Text style={styles.Title}>Nouvelle annonce</Text>
        </View>
        <ScrollView style={styles.main}>
          <View style={styles.containerImg}>
            <TouchableOpacity style={styles.image} onPress={() => {}}>
              <Image
                style={styles.image}
                source={{uri: this.state.Photo}}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            underlineColorAndroid = "transparent"
            placeholder = "Nom du plat"
            style = { styles.textInput }
            onChangeText = {(text) => this.setState({ nom: text })}
          />
          <View style={styles.picker}>
            <Text style={styles.ennoncPicker}>Nombre de part      </Text>
            <Picker
              selectedValue={this.state.qte}
              style={{height: 50, width: 300}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({qte: itemValue})
              }>
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
            </Picker>
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {4}
            maxLength = {200}
            blurOnSubmit = {true}
            underlineColorAndroid = "transparent"
            placeholder = "Description du plat, ingrédients, ..."
            style = { styles.description }
            onChangeText = {(text) => this.setState({ description: text })}
          />
          <View style={styles.picker}>
            <Text style={styles.ennoncPicker}>Prix par part     </Text>
            <TextInput
              maxLength = {2}
              blurOnSubmit = {true}
              keyboardType = 'numeric'
              placeholder = "€"
              style = { styles.prix }
              onChangeText = {(text) => this.setState({ prix: text })}
            />
          </View>
          <View style={styles.address_container}>
            <RadioForm
              radio_props={radio_props}
              initial= {-1}
              buttonColor={'#000000'}
              selectedButtonColor={'#000000'}
              onPress={(value) => {this.setState({value:value})}}
            />
          </View>
          <View style={styles.lastContainer}>
            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = {this.saveData}>
                <Text style = { styles.btnText }>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = {() => this.props.navigation.navigate("Poster") }>
                <Text style = { styles.btnText }>Retour</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
      flex : 1,
      marginHorizontal : 15,
  },
  containerImg : {
        alignItems: 'center',
  },
  firstContainer : {
    marginTop : 30,
    height : '5%',
  },
  main : {
    height : '80%',
  },
  prix : {
    fontSize : 17,
    width : 200,
    marginTop : 10,
    marginBottom : 10,
  },
  picker : {
    flexDirection : 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  description : {
    marginTop : 20,
    textAlignVertical: "top",
    height : 100,
    fontSize : 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  lastContainer : {
    flex : 1,
  },
  ennoncPicker : {
    marginTop : 10,
    fontSize : 18,
  },
  textInput: {
      backgroundColor: 'white',
      height: 40,
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      marginVertical: 5,
      alignSelf: 'stretch',
      padding: 8,
      fontSize: 16
  },
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10
  },
  image : {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 150,
    height:150,
    backgroundColor:'#fff',
    borderRadius:0 ,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
  Title : {
      textAlign: 'center',
      fontSize: 20,
      color: 'grey',
      marginBottom: 10
  },
  address_container : {
    paddingTop : '4%'
  }
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected,
    address: state.dataAddress,
    nbAddress : state.nbAddress
  }
}

export default connect(mapStateToPros)(NewPost)
