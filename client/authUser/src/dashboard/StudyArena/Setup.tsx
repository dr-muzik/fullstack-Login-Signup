import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAuth } from '../../StateContext/AuthContext'
import { Link, useNavigate } from 'react-router-dom';



const Setup = () => {
    const {updateSeconds, seconds, updateQuestionsNum} = useAuth();
    const [numOfQuestions, setNumOfQuestions] = useState<number>(5);
    const [numOfMins, setNumOfMins] = useState<number>(1);
    const [selectedCourse, setSelectedCourse] = useState('Cos102')

    useEffect(() => {
        updateSeconds(60);
    }, [])

    const Navigate = useNavigate();
    const AddNumByOne = () => {
          setNumOfQuestions(numOfQuestions + 1);  
    }
    
        const AddMinsByOne = () => {
            setNumOfMins(numOfMins + 1);
        }

    const SubtractNumByOne = () => {
      setNumOfQuestions(numOfQuestions - 1);
    }

    const SubtractMinsByOne = () => {
        setNumOfMins(numOfMins - 1);
        // console.log(selectedCourse)
    }

    const submitSetup = (e: React.FormEvent) => {
        e.preventDefault();
        updateSeconds(numOfMins * seconds);
        updateQuestionsNum(numOfQuestions);

        Navigate(`/gameInt/${selectedCourse}`);

        // setNumOfQuestions(10);
        
    }

    const getCourse = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(e.target.value)
    }

  return (
    <React.Fragment>
        
       <form action="" onSubmit={submitSetup} id='Quiz-setup'>
        <div className="form-container">

            <label htmlFor="questions">Select Number of Questions</label>
            <div className="right-grid">
                <button type='button' onClick={AddNumByOne}>+</button>
                <span style={{marginInlineEnd: "10px"}}>{numOfQuestions}</span>
                <button type='button' onClick={SubtractNumByOne}>-</button>
            </div>

            <label htmlFor="Time">Adjust Time(mins): </label>
            <div className="right-grid">
                <button type='button' onClick={AddMinsByOne}>+</button>
                <span style={{marginInlineEnd: "10px"}}>{numOfMins}</span>
                <button type='button' onClick={SubtractMinsByOne}>-</button>
            </div>

            <label htmlFor="Course">Course Type: </label>
            <div className="right-grid">
                <select name="course" value={selectedCourse} id="course" onChange={getCourse} className="text-bg-light">
                    <option value="Cos102">Cos102</option>
                    <option value="Phy115">Phy115</option>
                    <option value="Chem103">Chem103</option>
                </select>
            </div>

            </div>
            <button>Enter Quiz</button>
       </form>
    
    </React.Fragment>
  )
}

export default Setup