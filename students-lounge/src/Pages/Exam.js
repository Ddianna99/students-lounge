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

  // const [questions, setQuestions] = useState({
  //   questions:[{
  //       hint:'',
  //       question:'',
  //       time:''
  //   }]})




  const[exam, setExam] = useState()

  const [questionNumber, setQuestionNumber] = useState(0)
  const [resultId, setResultId] = useState()
  const [loading, setLoading] = useState(true)

  const[result, setResult] = useState({
    answer:[],
    student:'',
    startDate: '',
    subject: '',
    teacher: ''
  })


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

  const [idsArray, setidsArray] = useState([])

  const handleSubmit = async () => {
    console.log(answer.emotions)
    //answer.question= exam[questionNumber].id
    answer.question = exam.questions[questionNumber].question
    answer.time = exam.questions[questionNumber].time
    await addDoc(collection(firestore, 'answer'),answer)
    .then(docRef => {
      idsArray.push(docRef.id)
      setidsArray(idsArray)
      //setidsArray(docRef.id)
      console.log(`idsArray = ${idsArray}`)

      setResult(prevState => ({...prevState, student: `${localStorage.getItem("loggedEmail")}`,teacher: `${exam.teacher}`,subject: `${exam.subject}`,answer:idsArray}));
 

      if((questionNumber) === exam.questions.length-1){
        addDoc(collection(firestore, 'results'),result)
      }
      else{
          setQuestionNumber(prevstate => prevstate + 1)  
      }

    });
  }

  useEffect(() => {
    const current = new Date();
    setResult(prevState => ({...prevState, startDate: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`}));

    getDocs(collection(firestore, 'tests')).then(response => {
      var tempQuestions = []
      response.docs.forEach(doc => {  tempQuestions.push({questions: doc.data().questions, subject: doc.data().subject, teacher: doc.data().teacher })})

      console.log( tempQuestions.filter(question => { return localStorage.getItem("loggedSubject").includes(question.subject)}))
      setExam(tempQuestions[0])
      setLoading(false)
  })
  }, []);


  const displayQuestion = (questionNumber) => {
    //questions.find((subj) => subj.subject === anotherItems)
    if(questionNumber >= exam.questions.length)
      {
        window.alert("EXAM OVER")
        return <></>}

    return (
      <>
        <div>
          <li>{exam.questions[questionNumber].question}</li>
          <label>
            Answer:
            <input type="text" name="answer" onChange={(event) => setAnswer(prevstate => 
              ({ ...prevstate, answer: event.target.value }))} />
          </label>
          <li>Hint: {exam.questions[questionNumber].hint}</li>
          <li>Time for response: {exam.questions[questionNumber].time}</li>
        </div>
          <ReactInterval timeout={1000*exam.questions[questionNumber].time} enabled={true}
              callback={() => handleSubmit()} />
      </>
  )}

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

                  const  key = res.data

                  if(key != ""){
                    answer.emotions[key] = answer.emotions[key] + 1
                    console.log(` answer.emotions = ${answer.emotions[key]}`)
                  }
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
        !loading ?
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

