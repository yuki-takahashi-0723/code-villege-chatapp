import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'





const firebaseConfig = {
    apiKey: "AIzaSyB2D6yZFSAVsOX7FCI01blBAUYVsKbtR5E",
    authDomain: "new-chat-app-b3a32.firebaseapp.com",
    projectId: "new-chat-app-b3a32",
    storageBucket: "new-chat-app-b3a32.appspot.com",
    messagingSenderId: "1042482776604",
    appId: "1:1042482776604:web:7f7e86ad3b598ee810edd9",
    measurementId: "G-P0Q02B2ZBT"
  };

  firebase.initializeApp(firebaseConfig)
  export const Firebase = firebase

  export const auth = firebase.auth()
  export const db = firebase.firestore()
  export const storage = firebase.storage()
  export const timestamp = firebase.firestore.Timestamp
  export const fieldValue = firebase.firestore.FieldValue
  

