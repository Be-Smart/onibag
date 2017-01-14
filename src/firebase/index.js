import firebase from 'firebase';

try {
  const config = {
    apiKey: "AIzaSyDDLxL8t3OkChCaKFF29MWo7RAuVZwMhpc",
    authDomain: "addresses-a1c61.firebaseapp.com",
    databaseURL: "https://addresses-a1c61.firebaseio.com",
    storageBucket: "addresses-a1c61.appspot.com",
    messagingSenderId: "694507162372"
  };

  firebase.initializeApp(config);
} catch (e) {

}


export const firebaseRef = firebase.database().ref();
export default firebase;
