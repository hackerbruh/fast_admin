import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCJAcMVgfEQkrPtG_4vYqRLajMX2MdsM7I",
  authDomain: "fast-d2857.firebaseapp.com",
  databaseURL: "https://fast-d2857.firebaseio.com",
  projectId: "fast-d2857",
  storageBucket: "fast-d2857.appspot.com",
  messagingSenderId: "878906369174",
  appId: "1:878906369174:web:421297bf10efe848834eb7",
  measurementId: "G-FZ2LV5ZCXE"
  };
const fire=firebase.initializeApp(config);
export default fire;

