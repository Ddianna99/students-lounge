import { useTimer } from 'react-timer-hook';
import React, {useEffect, useState, useRef } from "react";
import { getDocs, collection } from 'firebase/firestore/lite';
import {useNavigate} from "react-router-dom";

export default function StartExam(props){

    const { firestore} = props;

    //const [loading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [time, setTime] = useState()
    const [questions, setQuestions] = useState([])
  //   const { start, stop, isActive } = setInterval(
  //     () => {
  //         console.log('Callback every 500 ms');
  //     },
  //     500,
  //     {
  //         autoStart: false,
  //         immediate: false,
  //         selfCorrecting: false,
  //         onFinish: () => {
  //             console.log('Callback when timer is stopped');
  //         },
  //     }
  // );

    useEffect(() => {
  
      getDocs(collection(firestore, 'questions')).then(response => {
  
        let tempQuestions = []
        response.forEach(doc => tempQuestions.push({...doc.data(), id:doc.id}))
  
        setQuestions(tempQuestions);
        })
    }, []);

    const handleCheck = event => {
      if (event.target.checked) {
        setIsChecked(true)
      } 
      else
      setIsChecked(false)
    };

    const navigate = useNavigate();
    const handleClick = () => {
      if(isChecked==true)
      {
        navigate('/Exam')
      }
      else
      {
      window.alert("If you want to start, must to check that you agree with the condition!")
      }

    }

    return (
        <div>
            <p>Are you ready?</p>
            <p>Good luck</p>
            <br></br>
            <label>
                { < input type="checkbox" onClick = {handleCheck} value={isChecked} id="checked"name="checked"/> }
                This application will use your camera and will register your emotions. Check this if you agree to continue this exam!           
            </label>
            <br></br>
            <br></br>
            <button  id='btn' onClick = {handleClick} type="submit">Start exam</button>
        </div>
      );

} 