import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBo2hTjcvBTfbeeypsV4ZF3gZcS_S2Ud18",
    authDomain: "task--blog-667e5.firebaseapp.com",
    databaseURL: "https://task--blog-667e5-default-rtdb.firebaseio.com",
    projectId: "task--blog-667e5",
    storageBucket: "task--blog-667e5.appspot.com",
    messagingSenderId: "1012615079104",
    appId: "1:1012615079104:web:f075ad7fac2d774089b925"
})

const db = firebaseApp.firestore()

export default db;