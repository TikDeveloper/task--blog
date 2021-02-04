import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBo2hTjcvBTfbeeypsV4ZF3gZcS_S2Ud18",
    authDomain: "task--blog-667e5.firebaseapp.com",
    projectId: "task--blog-667e5",
    storageBucket: "task--blog-667e5.appspot.com",
    messagingSenderId: "1012615079104",
    appId: "1:1012615079104:web:f075ad7fac2d774089b925"
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
