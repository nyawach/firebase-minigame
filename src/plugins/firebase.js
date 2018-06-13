import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDJV5Ta3pn7KSUZUoQMmv1mak9fdAOoRX8",
  authDomain: "minigame-8bc04.firebaseapp.com",
  databaseURL: "https://minigame-8bc04.firebaseio.com",
  projectId: "minigame-8bc04",
  storageBucket: "minigame-8bc04.appspot.com",
  messagingSenderId: "112794070469"
};

const app = firebase.initializeApp(config);

export default app.database()
