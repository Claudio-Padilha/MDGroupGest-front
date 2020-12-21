import firebase from 'firebase/app'
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyBjOl-fPq8AJg20b5GMamCO-dfkUxhAqbY",
    authDomain: "mdgroupgest.firebaseapp.com",
    projectId: "mdgroupgest",
    storageBucket: "mdgroupgest.appspot.com",
    messagingSenderId: "106410853934",
    appId: "1:106410853934:web:3a33e099357a3d4ba441bf",
    measurementId: "G-RX0G9JP5J6"
  };

firebase.initializeApp(firebaseConfig);

// firebase.analytics();

const storage = firebase.storage()


export  {
    storage, firebase as default
  }
 