import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

 const config = {
  apiKey: "AIzaSyCdKQ1ylXIoPmI_o7X_qmMuEJDl8NiIoA8",
  authDomain: "fir-functions-enye.firebaseapp.com",
  databaseURL: "https://fir-functions-enye.firebaseio.com",
  projectId: "fir-functions-enye",
  storageBucket: "fir-functions-enye.appspot.com",
  messagingSenderId: "108174505950",
  appId: "1:108174505950:web:8d71b15167875b71984f4f",
  measurementId: "G-VCCYTVTGW8"
};


const fire = firebase.initializeApp(config);

const firebaseDB = fire.database();
const firebaseUsers = firebaseDB.ref("user");
export {
  fire,
  firebaseDB,
  firebaseUsers,
};
