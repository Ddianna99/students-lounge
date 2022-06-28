import React, { useEffect, useState } from 'react'
import { getDocs, addDoc, collection } from 'firebase/firestore/lite';
import { getDoc } from '@firebase/firestore';

export default function Results(props) {
    const { firestore } = props;

    const[result, setResults] = useState([])
    const[number, setNumber] = useState([0])
    const [loading, setLoading] = useState(true)
    const[answers, setAnswers] = useState()

    useEffect(() => {
        getDocs(collection(firestore, 'results')).then(response => {
            let results = response.docs.filter(doc => localStorage.getItem("loggedSubject").includes(doc.data().subject) )
            let resultsData = results.map(r => {return r.data()})
            let ans = []
            Object.entries(resultsData).map(item => {
                ans.push(item[1].answer);
            })
            ans = ans.flat()
            setResults(resultsData)
            getDocs(collection(firestore, 'answer')).then(res => {
                let a = res.docs.filter(item => ans.includes(item.id))
                a = a.map(r => ({answer:r.data(),id: r.id}))
                setAnswers(a)
                setLoading(false)
            })
        })
        
      }, []);

      const displayAnswer = (a) =>
      {
        const l = answers.filter(ans => ans.id == a[0])[0]
 
        return <>
            <li>{l?.answer.answer}</li>
            <li>{l?.answer.question}</li>
            <li>{l?.answer.time}</li>
            { 
            l?
            Object.keys(l.answer.emotions).map(function(e, c) {
               return <li>{e} {c}</li>
            })
            :
            <></>
            }
          </>
      }

      const displayResult = (r) => {
          return <div>
            <li>{r.student.replace(/['"]+/g, '')}</li>
            <li>{r.startDate}</li>
            {displayAnswer(r.answer)}
          </div>
      }

    return (
       <div>  
        { 
        !loading ?
        <>
            <div className='results'>
                <h1>Results</h1>
                <br></br>
                <br></br>
                <h2>{localStorage.getItem("loggedSubject").replace(/['"]+/g, '')}</h2>
                {result.map(r =>{ return displayResult(r)})}
                <br></br>
            </div> 
        </>
        :
        <></>
        }
       </div> 
       )
}