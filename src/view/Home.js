import React from 'react'
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native'
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';


// const { width, height } = Dimensions.get('window');
// const SCREEN_WIDTH = width;
// const ASPECT_RATIO = width / height;
// const LATITUDE = 13.78825;
// const LONGITUDE = 101.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class DefaultContainer extends React.Component {
    // state = {
    //     region: {
    //         latitude: LATITUDE,
    //         longitude: LONGITUDE,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //     },
    // };
    
    render() {
      return (
        <View style={styles.container}>
          {this.props.children}
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    containter: {}
  });
  
  class Map extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Mapa',
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="map" size={iconSize} color={tintColor} />
      ),
    };
  
    render() {
      return (
        <DefaultContainer>
          <View style ={{
            ...StyleSheet.absoluteFillObject,
            height:600,
            width: 400,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <MapView
            style={{...StyleSheet.absoluteFillObject}}
            initialRegion={{
              latitude: 13.78825,
              longitude: 101.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Marker
              // coordinate={marker.latlng}
              // image={require('../assets/pin.png')}
            />
          </View>
  
        </DefaultContainer>
      );
    }
  }

  export default Map