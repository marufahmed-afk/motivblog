import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
apiKey: "AIzaSyAjySGNlkYENHemPQNqjvzK88I82CCmImk",
authDomain: "motivblog-e93b8.firebaseapp.com",
databaseURL: "https://motivblog-e93b8.firebaseio.com",
projectId: "motivblog-e93b8",
storageBucket: "motivblog-e93b8.appspot.com",
messagingSenderId: "778659743316",
appId: "1:778659743316:web:49a32c2b2ae2062c9d0fc1",
measurementId: "G-VZ2PV5N7DB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();