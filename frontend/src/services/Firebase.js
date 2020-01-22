import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCr81qdS07NNXydE3JeW_XYyLUlOLBMmV0',
  authDomain: 'favmovies-16020.firebaseapp.com',
  projectId: 'favmovies-16020',

  databaseURL: 'https://favmovies-16020.firebaseio.com',
  storageBucket: 'favmovies-16020.appspot.com',
  messagingSenderId: '94209590891',
  appId: '1:94209590891:web:5e17280120beca97ea932e',
};

const myFirebase = firebase.initializeApp(config);

const Firebase = {
  login() {
    const provider = new firebase.auth.GithubAuthProvider();
    return myFirebase.auth().signInWithPopup(provider);
  },
};

export default Firebase;
