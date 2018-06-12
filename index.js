import { AppRegistry } from 'react-native';
// import App from "./src/view/Landing"
import * as firebase from 'firebase';
import {AppNavigator} from './src/view/Login'

  // Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-3jyJznotfJH7_ReDEmWAwSU_JVeeS-Y",
  authDomain: "hackatron2-e2817.firebaseapp.com",
  databaseURL: "https://hackatron2-e2817.firebaseio.com",
  projectId: "hackatron2-e2817",
  storageBucket: "hackatron2-e2817.appspot.com",
  messagingSenderId: "548998022859"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// AppRegistry.registerComponent('hackatron3', () => App);
AppRegistry.registerComponent('hackatron3', () => AppNavigator);
