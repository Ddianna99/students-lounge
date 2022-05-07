import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore/lite';


export default function PersonList(props) {
  const { firestore } = props;

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocs(collection(firestore, 'users')).then(response => {
      setUsers(response.docs)
      setLoading(false)
    })
  }, []);

  const displayUsers = () => {
    return users.map(user => {
      return <>
        <li>{user.data().first_name}</li>
        <li>{user.data().last_name}</li>
        <li>{user.data().email}</li>
        <li>{user.data().teacher.toString()}</li>
      </>
    })
  }

  return (
    <ul>
      {
        !loading ?
          (
            displayUsers()
          ):
            <></>
      }
    </ul >
  )
}
