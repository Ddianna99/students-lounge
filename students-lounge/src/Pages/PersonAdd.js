import { addDoc, collection } from 'firebase/firestore/lite';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function PersonAdd(props) {

  const { firestore } = props
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    teacher: '',
  })

  //const navigate = useNavigate();

  const handleSubmit = async () => {
    const result = await addDoc(collection(firestore, 'users'), user);
    window.alert('✅ Very well, you have successfully registered!')
  }

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/', {replace: true});
  };

  return (
    <div>
      <form >
        <label>
          First name:
          <input type="text" name="first_name"
            onChange={(event) =>
              setUser(prevstate => ({
                ...prevstate, first_name: event.target.value
              }))} />
        </label>
        <br></br>
        <label>
          Last name:
          <input type="text" name="last_name" onChange={(event) => setUser(prevstate => ({ ...prevstate, last_name: event.target.value }))} />
        </label>
        <br></br>
        <label>
          E-mail:
          <input type="text" name="email" onChange={(event) => setUser(prevstate => ({ ...prevstate, email: event.target.value }))} />
        </label>
        <br></br>
        <label>
          Password:
          <input type="password" name="password" onChange={(event) => setUser(prevstate => ({ ...prevstate, password: event.target.value }))} />
        </label>
        <br></br>
        <label>
          Student
          <input type="radio" name="teacher" onChange={(event) => setUser(prevstate => ({ ...prevstate, teacher: event.target.value }))} />
        </label>
        <br></br>
        <label>
          Teacher
          <input type="radio" name="teacher" onClick={(event) => setUser(prevstate => ({ ...prevstate, teacher: event.target.value }))} />
        </label>
        <br></br>
        <button id='btn' onClick={handleSubmit} type="submit">Add</button>
        <br></br>
        <button onClick={handleBackClick}>Back</button>
      </form>
    </div>
  )
}
