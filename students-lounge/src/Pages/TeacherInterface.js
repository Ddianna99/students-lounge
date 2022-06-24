import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore/lite';
import { useNavigate } from "react-router-dom";


export default function TeacherInterface(props) {
    const { firestore } = props;

    const [exam, setExam] = useState([])
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('loggedEmail'));
        if (items) {
            setItems(items);
        }
        console.log("item: " + items)

        getDocs(collection(firestore, 'exams')).then(response => {
            setExam(response.docs.map(doc => ({ students: doc.data().students, subject: doc.data().subject, teacher: doc.data().teacher })))
            setLoading(false)
        })

    }, []);

    const handleClick = () => {
        navigate('/addExam')

    }

    const handleClickAddExam = () => {
      navigate('/addExam')
    }

    const handleClickAddStudents = () => {
      navigate('/addStudents')
    }

    const displayExamCard = () => {
        console.log(exam)
        console.log(exam.teacher)
        console.log(exam.subject)
        exam.find((user) => user.teacher === items)
        return (
            <div className="card one">
                <div className="details">
                    <div className="content">
                        <div className='subject'>
                            {Object.keys(exam).map((keys) => { return <h2>{exam[keys].subject}</h2> })}
                        </div>
                        <button id='btn' onClick={handleClick} type="submit">See result</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        !loading ?
            (
                <div className="container">
                    <h1>Exams</h1>
                    <div className="cards">
                        {displayExamCard()}
                    </div>
                    <br></br>
                    <br></br>
                    <button onClick={handleClickAddExam} type="submit">Add new exam</button>
                    <button onClick={handleClickAddStudents} type="submit">Add students</button>
                </div>
            ) :
            <></>
    )
}
