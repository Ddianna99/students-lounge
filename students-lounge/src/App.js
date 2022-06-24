import "./Styles/styles.css";
//import SignupForm from './Components/SignupForm';
//import LoginForm from './Components/LoginForm';
//import PersonList from './PersonList.js';
import PersonAdd from './Pages/PersonAdd';
import StartExam from './Pages/StartExam';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
//import PersonList from './Pages/PersonList';
//import AddExam from './Pages/AddExam';
//import Exam from './Pages/Exam'
import Login from './Pages/Login'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import AddExam from './Pages/AddExam';
import AddStudents from './Pages/AddStudents';
import Exam from './Pages/Exam';
import StudentInterface from './Pages/StudentInterface';
import TeacherInterface from './Pages/TeacherInterface';
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
  const time = new Date()
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/PersonAdd" exact={true} element={<PersonAdd firestore={firestore} />} />
            <Route path="/" exact={true} element={<Login firestore={firestore} />} />
            <Route path="/start" exact={true} element={<StartExam firestore={firestore} />} />
            <Route path="/teacher" exact={true} element={<TeacherInterface firestore={firestore} />} />
            <Route path="/student" exact={true} element={<StudentInterface firestore={firestore} />} />
            <Route path="/Exam" exact={true} element={<Exam firestore={firestore} time={time} />} />
            <Route path="/addExam" exact={true} element={<AddExam firestore={firestore} />} />
            <Route path="/addStudents" exact={true} element={<AddStudents firestore={firestore} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
