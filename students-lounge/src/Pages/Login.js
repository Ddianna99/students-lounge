import React, {useEffect, useState } from "react";
import { getDocs, collection } from 'firebase/firestore/lite';
import { BrowserRouter as Router, Link, useNavigate} from "react-router-dom";


export default function Login(props) {

  const { firestore } = props;

  const [users, setUsers] = useState([])
  const [database, setDatabase] = useState();
  let navigate = useNavigate();

  //const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocs(collection(firestore, 'users')).then(response => {
      setUsers(response.docs)
      setDatabase(response.docs.map(doc => ({ email: doc.data().email, password: doc.data().password, teacher:doc.data().teacher })))
    })
  }, []);

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info

  const errors = {
    uname: "invalid email",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.email === uname.value);
    localStorage.setItem('loggedEmail', JSON.stringify(userData.email));


    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        console.log(userData);
        if(userData.teacher)
        {
          navigate("/teacher", { replace: true });
        }
        else{
          navigate("/student", { replace: true });
        }
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email: </label>
          <input type="text" name="uname" placeholder="Enter email" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password: </label>
          <input type="password" name="pass" placeholder="Enter password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="signup">
        <Link to="/PersonAdd">Create a new account</Link>
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}