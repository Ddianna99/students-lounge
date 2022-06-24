import React, { useEffect, useState } from 'react'
import { getDocs, addDoc, collection } from 'firebase/firestore/lite';
import { arrayUnion, updateDoc } from '@firebase/firestore';
//import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Webcam from 'react-webcam';
import ReactInterval from 'react-interval';



export default function Exam(props) {
  const { firestore, time } = props;

  const [anotherItems, setAnotherItems] = useState([])

  const [questions, setQuestions] = useState({
    questions:[{
        hint:'',
        question:'',
        time:''
    }]})

  const [questionNumber, setQuestionNumber] = useState(0)
  const [resultId, setResultId] = useState()
  const [loading, setLoading] = useState(true)


  const [answer, setAnswer] = useState({
    answer: '',
    emotions: {
      Angry: 0,
      Disgusted: 0,
      Fearful: 0,
      Happy: 0,
      Neutral: 0,
      Sad: 0,
      Surprised: 0
    },
    question: '',
    time: ''
  })

  const handleSubmit = async () => {
    console.log(answer.emotions)
    answer.question= questions[questionNumber].id
    const result = await addDoc(collection(firestore, 'answer'),answer)
    .then(docRef => {
      updateDoc(collection(firestore, 'result'),{
        answers: arrayUnion(docRef.id)})
        .then(succes =>{
        });
        setQuestionNumber(prevstate => prevstate + 1)
        
    });
  }

  useEffect(() => {
    const current = new Date();
    const startDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`;
    //addDoc aduce tarziu result
    addDoc(collection(firestore, 'results'), {
      date:startDate,
      //answer: answer[questionNumber],
      //question:questions[questionNumber]
    })
    .then(docRef => {
      setResultId(docRef.id)
      time.setSeconds(time.getSeconds() + 2); 
    });

    const anotherItems = JSON.parse(localStorage.getItem('loggedSubject'));
    if (anotherItems) {
        setAnotherItems(anotherItems);
    }
    console.log("anotherItem: " + anotherItems)

    getDocs(collection(firestore, 'tests')).then(response => {
      let tempQuestions = []
      response.forEach(doc => tempQuestions.push({...doc.data(), id:doc.id}))
      console.log("t"+ tempQuestions)
      setQuestions(tempQuestions);
      console.log("q: "+questions)

      setLoading(false)
    })
    //return () => displayQuestion();
  }, []);



  const displayQuestion = (questionNumber) => {
      return <>
        <li>{questions.questions.question}</li>
        <label>
          Answer:
          <input type="text" name="answer" onChange={(event) => setAnswer(prevstate => 
            ({ ...prevstate, answer: event.target.value }))} />
        </label>
        <li>Hint: {questions.questions.hint}</li>
        <li>Time for response: {questions.questions.time}</li>
      </> 
  }
  const webcamRef = React.useRef(null);
  const videoConstraints = {
      width: 200,
      height: 200,
      facingMode: 'user'
  };
  const [name, setName] = useState('')
  const capture = React.useCallback(
      () => {
          const imageSrc = webcamRef.current.getScreenshot();
          //for deployment, you should put your backend url / api
          axios.post('http://127.0.0.1:5000/exam', { data: imageSrc })
              .then(res => {
                  console.log(`response = ${res.data}`)
                  setName(res.data)

                  if (res.data === "") {
                    return
                  }

                  const  key = res.data
                  answer.emotions[key] = answer.emotions[key] + 1
                  
              })
              .catch(error => {
                  console.log(`error = ${error}`)
              })
      },
      [webcamRef]
  );


  return (
    <ul>
      {
        loading ?
          (
            <>
              {displayQuestion(questionNumber)}
              <br></br>
              <ReactInterval timeout={1000} enabled={true}
              callback={() => capture()} />

              <Webcam
                  audio = {false}
                height = {300}
                ref = {webcamRef}
                screenshotFormat = "image/jpeg"
                width = {350}
                videoConstraints = {videoConstraints}
                />
              <button id='btn' onClick={handleSubmit} type="submit">Send</button>
            </>
          ):
            <></>
      }
    </ul >
  )
}

