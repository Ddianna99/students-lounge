import { addDoc, getDocs, collection } from 'firebase/firestore/lite';
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

export default function AddStudents(props) {

  const { firestore } = props

  const [exam, setExam] = useState({
    subject: '',
    students: [],
    teacher: ''
  })

  const [test, setTest] = useState([{
    subjects:[],
} ]);

const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    getDocs(collection(firestore, 'tests')).then(response => {
        setTest(response.docs.map(doc => ({ subject: doc.data().subject })))
      const subjectsEx = response.docs.map(doc => ({ subject: doc.data().subject }));
      console.log(test.subjects)
    })

    const teacher = JSON.parse(localStorage.getItem('loggedEmail'));

    console.log(teacher)
    if (teacher) {
        setTeacher(teacher);
    }
    console.log("item: " + teacher)

  }, []);
 

 const [inputFields, setInputFields] = useState([{
    email:'',
} ]);

const addInputField = ()=>{
    setInputFields([...inputFields, {
        email:'',
    } ])
}

const handleChange = (index, evnt)=>{
  const { name, value } = evnt.target;
  const list = [...inputFields];
  list[index][name] = value;
  setInputFields(list);
}
  
  const handleSubmit = async () => {
     exam.students = inputFields
     exam.teacher = teacher
     exam.subject = selectedExam
  
      await addDoc(collection(firestore, 'exams'), exam)
      .then(docRef => {
        console.log("added")
      });
  }

  const navigate = useNavigate();

  const handleBack = () =>{
    navigate('/teacher')
  }

  const [selectedExam, setSelected] = useState();
  const handleChangeSelectedExam = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className='exam'>
        <h1>Add students to exams</h1>
        <br></br>
        <label>
          Select exam:
        <select onChange={handleChangeSelectedExam}>
            {test.map((subjects, index) => (
                    <option key={index} value={selectedExam}>{subjects.subject}</option>
             ))}
        </select>
          
          {/* <input type="text" name="subject" onChange={(event) => setExam(prevstate => ({ ...prevstate, subject: event.target.value }))} /> */}
        </label>
            <div className="row">
            <br></br>
                <div className="col-sm-8">
                  {
                      inputFields.map((data, index)=>{
                          const {email} = data;
                          return(
                            <div className="row my-3" key={index}>
                            <div className="col">
                            <div className="form-group">
                    Email : <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={email} name="email" className="form-control"  placeholder="..." />
                            </div>
                            </div>
                          </div>
                          )
                      })
                  }
                 <br></br>
                <div className="row">
                    <div className="col-sm-12">
                    <button className="btn btn-outline-success " onClick={addInputField}>Add New Student</button>
                    </div>
                </div>
                  </div>
                </div>
                <div className="col-sm-4">
                </div>
        <button id='addBtn' onClick={handleSubmit} type="submit">Send students list to exam</button>
        <br></br>
        <button onClick={handleBack}>Back</button>
    </div>
  )
}
