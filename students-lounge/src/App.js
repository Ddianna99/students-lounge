import './App.css';
//import SignupForm from './Components/SignupForm';
//import LoginForm from './Components/LoginForm';
//import PersonList from './PersonList.js';
import PersonAdd from './Pages/PersonAdd';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import PersonList from './Pages/PersonList';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1l6CFfJZ_CUR5FiX13rmbFwUJUHOqO6g",
  authDomain: "students-lounge-2aa3d.firebaseapp.com",
  databaseURL: "https://students-lounge-2aa3d-default-rtdb.firebaseio.com",
  projectId: "students-lounge-2aa3d",
  storageBucket: "students-lounge-2aa3d.appspot.com",
  messagingSenderId: "400633284499",
  appId: "1:400633284499:web:48bb783df46ea0b87b4a66",
  measurementId: "G-12HV5T3FZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/* <PersonAdd firestore={db}/> */}
        <PersonList firestore={firestore}/>
      </header>
    </div>
  );
}

export default App;
