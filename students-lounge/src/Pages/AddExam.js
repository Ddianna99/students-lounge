import { addDoc, collection } from 'firebase/firestore/lite';
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

export default function AddExam(props) {

  const { firestore } = props
  const [exam, setExam] = useState({
    subject: '',
    students: '',
    teacher: ''
  })

 const [inputFields, setInputFields] = useState(
  [{
    question:'',
    time:'',
    hint:''  
} ]);
 
const addInputField = ()=>{
    setInputFields([...inputFields, {
      question:'',
      time:'',
      hint:''  
    } ])
}
const removeInputFields = (index)=>{
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
}

const handleChange = (index, evnt)=>{
  const { name, value } = evnt.target;
  const list = [...inputFields];
  list[index][name] = value;
  setInputFields(list);
}
  
  const handleSubmit = async () => {

    const quest = {
      questions: inputFields, 
      subject: exam.subject,
      teacher: teacher
    }

    await addDoc(collection(firestore, 'tests'), quest)
    .then(docRef => {
      console.log("added")
    });
  }

  const navigate = useNavigate();

  const handleBack = () =>{
    navigate('/teacher')
  }

  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem('loggedEmail'));

    console.log(teacher)
    if (teacher) {
        setTeacher(teacher);
    }
    console.log("item: " + teacher)

  }, []);

  return (
    <div className='exam'>
        <h1>Create exam</h1>
        <br></br>
        <label>
          Title:
          <input type="text" name="subject" onChange={(event) => setExam(prevstate => ({ ...prevstate, subject: event.target.value }))} />
        </label>
            <div className="row">
            <br></br>
                <div className="col-sm-8">
                  {
                      inputFields.map((data, index)=>{
                          const {question, time, hint} = data;
                          return(
                            <div className="row my-3" key={index}>
                            <div className="col">
                            <div className="form-group">
       Question {index+1} : <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={question} name="question" className="form-control"  placeholder="..." />
                            </div>
                            </div>
                            <div className="col">
                      Hint: <input type="email" onChange={(evnt)=>handleChange(index, evnt)} value={hint} name="hint" className="form-control" placeholder="..." />
                            </div>
                            <div className="col">
        Time for response: <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={time} name="time" className="form-control" placeholder="..." />
                            </div>
                            <div className="col">
                
                            {(inputFields.length!==1)? <button className="btn btn-outline-danger" onClick={removeInputFields}>Remove</button>:''}
                  
                            </div>
                          </div>
                          )
                      })
                  }
                 <br></br>
                <div className="row">
                    <div className="col-sm-12">
                    <button className="btn btn-outline-success " onClick={addInputField}>Add New Question</button>
                    </div>
                </div>
                  </div>
                </div>
                <div className="col-sm-4">
                </div>
        <button id='addBtn' onClick={handleSubmit} type="submit">Create exam</button>
        <br></br>
        <button onClick={handleBack}>Back</button>
    </div>
  )
}
