import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore/lite';
import { useNavigate } from "react-router-dom";


export default function StudentInterface(props) {
    const { firestore } = props;

    const [exam, setExam] = useState([])
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([]);
    const [students, setStudents] = useState([]);
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

    console.log("exam "+ exam)
    console.log("vv" + exam.subject)

    const handleClick = () => {
        localStorage.setItem('loggedSubject', JSON.stringify(exam.subject))
        console.log()
        navigate('/start')

    }

    const displayExamCard = () => {
        console.log(exam)
        console.log("teeach " + exam.teacher)
        console.log("subjjj " +exam.subject)
        exam.find((user) => user.students === items)
        return (
            <>
            {Object.keys(exam).map((exam) => { return (
                <div className="card one">
                <div className="details">
                    <div className="content">
                        <div className='subject'>
                            {exam.subject}
                        </div>
                        <div className='teacher'>
                            {exam.teacher}
                        </div>
                        <button id='btn' onClick={handleClick} type="submit">Apply</button>
                    </div>
                </div>
            </div>
            ) })}
            
            </>
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
                </div>
            ) :
            <></>
    )
}
