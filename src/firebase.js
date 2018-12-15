import firebase from "firebase/app"
import "firebase/database"
import Rebase from 're-base';

const fire = firebase.initializeApp({
  apiKey: "AIzaSyDM3BhNODbs7giiUWgb_NPArtQzZkPr8YM",
  authDomain: "can-ella-eat.firebaseapp.com",
  databaseURL: "https://can-ella-eat.firebaseio.com",
  projectId: "can-ella-eat",
  storageBucket: "can-ella-eat.appspot.com",
  messagingSenderId: "858869238702"
}).firebase_

const db = fire.database()
const base = Rebase.createClass(db);

export {base, db}
