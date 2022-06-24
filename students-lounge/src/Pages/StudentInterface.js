import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore/lite';
import { useNavigate } from "react-router-dom";


export default function StudentInterface(props) {
    const { firestore } = props;

    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('loggedEmail'));
        if (items) {
            setItems(items);
        }
        getDocs(collection(firestore, 'exams')).then(response => {
            var tempExams = []
            response.docs.forEach(doc => {  tempExams.push({students: doc.data().students, subject: doc.data().subject, teacher: doc.data().teacher })})
            setExams(tempExams)
            setLoading(false)
        })

    }, []);


    const handleClick = (val) => {
        localStorage.setItem('loggedSubject', JSON.stringify(val))
        navigate('/start')

    }

    const displayExamCard = () => {
        console.log(exams);
        exams.find((user) => user.students === items)
        return (
            <>
            {exams.map((exam) => { return (
                <div className="card one">
                <div className="details">
                    <div className="content">
                        <div className='subject'>
                            {exam.subject}
                        </div>
                        <div className='teacher'>
                            {exam.teacher}
                        </div>
                        <button id='btn' onClick={() => handleClick(exam.subject)} type="submit">Apply</button>
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
