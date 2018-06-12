import React from 'react'
import {StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity} from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Button } from 'native-base'
import firebase, { database, auth, uid} from 'firebase';
import { ImageBackground, Image } from 'react-native';
import Modal from "react-native-modal";
import BG from '../blurred.jpg'
// import {againHome} from './Home.js'


var width = Dimensions.get('window').width;
class Rider extends React.Component {
  state = {
    destination: '',
    status: null,
    time: '',
    cap: '',
    plate: '',
    price: '',
    data: [],
    text: '',
    isModalVisible1: false,
    isModalVisible: false,
    identification: ''

  }
  _toggleModal1 = (id) => ()=>
  this.setState({ 
    isModalVisible1: !this.state.isModalVisible1,
    identification: id
   });

  _toggleModal = (id) => ()=>
    this.setState({ 
      isModalVisible: !this.state.isModalVisible,
      identification: id
     });

  again () {
    againHome;
    var uid = firebase.auth().currentUser.uid;
    var rideRef = firebase.database().ref("status/" + uid)
    rideRef.once("value", (x) => {
      if (x.exists()){
        this.setState({
          status: x.val().status
        })


      } else {
        console.log('not riding anything')
        var ref = firebase.database().ref("notes/");
        const data = [];
        ref.once("value", (childSnapshot) => {
          childSnapshot.forEach((doc) => {
            data.push({
              text : doc.val(),
              id: doc.key
            })
            this.setState({
              data: data
            })
          });
        });
      }
    })
  }




  componentWillMount() {
    var uid = firebase.auth().currentUser.uid;

    var rideRef = firebase.database().ref("status/" + uid)
    rideRef.once("value", (x) => {
      if (x.exists()){
        this.setState({
          status: x.val().status
        })


      } else {
        console.log('not riding anything')
        var ref = firebase.database().ref("notes/");
        const data = [];
        ref.once("value", (childSnapshot) => {
          childSnapshot.forEach((doc) => {
            data.push({
              text : doc.val(),
              id: doc.key
            })
            this.setState({
              data: data
            })
          });
        });
      }
    })

  }

  update () {
    console.log('homeeee', Home)
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("notes/" + this.state.identification);
    ref.once("value", (x)=> {
      ref.set( 
        {
          dest: x.val().dest,
          time: x.val().time,
          cap: parseInt(x.val().cap) + 1,
          plate: x.val().plate,
          price: x.val().price        
        }
    )
    })

  }

  riding = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('riding/' + uid).set( //suppose to be the currentuser that logged in 'riding/' + uid
      {
        driver: this.state.identification,
      }
    ).then(() =>{ 
      firebase.database().ref('status/' + uid).set(
        {
          status: 'rider'
        }
      ).then(() => {
        this.update()
        this.again()
        
        console.log('inserted')
      }).catch(() => {
        console.log('err')
      })
      console.log('insert done');
    }).catch((error) =>{
      console.log(error);
    })

    // console.log(data);
  }
    render() {

      if (this.state.status === null){
        console.log('data for nor riding', this.state.data)
        return (
          <ImageBackground source={BG} style={styles.bg}>
          <Container>
          <Content>
          <View style={{ flex: 1 }}>

          <Modal isVisible={this.state.isModalVisible1} onSwipe={this._toggleModal1} swipeDirection="down">
            <View style={styles.modalContent}>
              <Text>Full Capacity </Text>
              {/* <TouchableOpacity onPress={this._toggleModal}> */}
              <Button rounded onPress={() => this.riding()} style={{backgroundColor: '#ff6700',width: width*0.55}}>
                <Text style={{paddingLeft:'30%', fontSize: 20, color: 'white'}} >CLOSE</Text>
              </Button>
              {/* </TouchableOpacity> */}
            </View>
          </Modal>
          </View>
          <View style={{ flex: 1 }}>

          <Modal isVisible={this.state.isModalVisible} onSwipe={this._toggleModal} swipeDirection="down">
            <View style={styles.modalContent}>
              <Text>Are you Sure </Text>
              {/* <TouchableOpacity onPress={this._toggleModal}> */}
              <Button rounded onPress={() => this.riding()} style={{backgroundColor: '#ff6700',width: width*0.55}}>
                <Text style={{paddingLeft:'30%', fontSize: 20, color: 'white'}} >RIDE</Text>
              </Button>
              {/* </TouchableOpacity> */}
            </View>
          </Modal>
        </View>
          {
            this.state.data.map((data)=>
            <Card>
              <CardItem header>
                <Text>
                Destination:
                {data.text.dest.join(", ")}
                </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Time: {data.text.time}
                  </Text>
                  <Text>
                    Capacity: {data.text.cap}
                  </Text>
                  <Text>
                    Plate: {data.text.plate}
                  </Text>
                  <Text>
                    Price: {data.text.price}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
              <Button rounded onPress={this._toggleModal(data.id)} style={{backgroundColor: '#ff6700',width: width*0.9}}>
                <Text style={{paddingLeft:'40%', fontSize: 20, color: 'white'}} >RIDE</Text>
              </Button>
              </CardItem>
            </Card>
            )
          }

          </Content>
          </Container>
          </ImageBackground>
        )
    } else {
      return (
        <ImageBackground source={{uri: '/Users/kanokpatai/Desktop/carpoolPhone/blurred.jpg'}} style={styles.bg}>
        <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>
                You are currently on the Ride   
              </Text>
            </CardItem>
            <CardItem>
            </CardItem>
            <CardItem footer>
              <Text></Text>
            </CardItem>
          </Card>
          )
        

        </Content>
        </Container>
        </ImageBackground>
      )
    }
  }
}

export default Rider;

const styles = StyleSheet.create({
  container: {
    marginTop: '10%;',
    paddingTop: '10%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  form: {
    // width: width*0.9,
  },
  bg: {
    flex: 1,
  },
  butt: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }

});
