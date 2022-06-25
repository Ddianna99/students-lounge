import React, { useEffect, useState } from 'react'
import { getDocs, addDoc, collection } from 'firebase/firestore/lite';
import { getDoc } from '@firebase/firestore';

export default function Results(props) {
    const { firestore } = props;

    const[result, setResults] = useState([])
    const[number, setNumber] = useState([0])
    const [loading, setLoading] = useState(true)
    const[answers, setAnswers] = useState([])

    useEffect(() => {
        getDocs(collection(firestore, 'results')).then(response => {
            let results = response.docs.filter(doc => localStorage.getItem("loggedSubject").includes(doc.data().subject) )
            let resultsData = results.map(r => {return r.data()})
            let ans = []
            Object.entries(resultsData).map(item => {
                ans.push(item[1].answer);
            })
            setResults(resultsData)
            getDocs(collection(firestore, 'answer')).then(res => {
                let a = res.docs.filter(item => !ans.includes(item.docRef))
                a = a.map(r => ({answer:r.data(),id: r.id}))
                let ansData = []
                Object.entries(a).map(item => {
                    ansData.push(item[1]);
                })
                setAnswers(ansData)
                setLoading(false)
            })
        })
        
      }, []);

      const displayAnswer = (a) =>
      {
        const l = answers.filter(ans => ans.id == a)
        return <>
            <li>{l.answer}</li>
            <li>{l.question}</li>
            <li>{l.time}</li>
          </>
      }

      const displayResult = async (r) => {
          return <>
            <li>{r.student}</li>
            <li>{r.startDate}</li>
            {r.answer.map(o =>{return displayAnswer(o) })}
          </>
      }

    return (
        
        !loading ?
        <>
            <div className='results'>
                <h1>Results</h1>
                <h2>{localStorage.getItem("loggedSubject")}</h2>
                <br></br>
                {result.map(r =>{displayResult(r)})}
                <br></br>
            </div> 
        </>
        :
        <></>)
}