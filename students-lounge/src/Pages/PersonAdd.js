import { addDoc, collection } from 'firebase/firestore/lite';
import React, { useState } from 'react'

export default function PersonAdd(props) {

  const { firestore } = props
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    teacher: '',
  })

  const handleSubmit = async () => {
    const citySnapshot = await addDoc(collection(firestore, 'users'), user);
  }

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
      </form>
    </div>
  )
}
/*import React from 'react';


export default class PersonAdd extends React.Component {
  state = {
    
  }

  handleChange = event => {
    this.setState({ first_name: event.target.value });
    this.setState({ last_name: event.target.value });
    this.setState({ email: event.target.value });
    this.setState({ password: event.target.value });
    this.setState({ student: event.target.value });
    this.setState({ teacher: event.target.value });
  }

}
*/