import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom';

// type Props = {}

interface IUser {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  

const Register = () => {
    const [input, setInput] = useState<IUser[]>([{
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }])
    
      const submitHandler = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
         const result =    await axios.post('/api/v1/register', input[0]);
         console.log(result);
         console.log(input)
        } catch (error) {
            console.error("error submitting data", error);
        }

        // Handle the submission logic here
        console.log('Form submitted:', input[0]);
    
      }

      const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prevInput => [
          {
            ...prevInput[0],
            [name]: value,
          },
        ]);
      };

  return (
    <>
         <form action=""  onSubmit={submitHandler} method='post'>
        <h1>Registration</h1>
        <div className="input-area">
          <label htmlFor="form-input1">Firstname</label>
          <input type="text" name="firstname" id="form-input1" onChange={handleInputChange} />
        </div>
        <div className="input-area">
          <label htmlFor="form-input2">Lastname</label>
          <input type="text" name="lastname" id="form-input2" onChange={handleInputChange} />
        </div>
        <div className="input-area">
          <label htmlFor="form-input3">Username</label>
          <input type="text" name="username" id="form-input3" onChange={handleInputChange} />
        </div>
        <div className="input-area">
          <label htmlFor="form-input4">Email</label>
          <input type="text" name="email" id="form-input4" onChange={handleInputChange} />
        </div>
        <div className="input-area">
          <label htmlFor="form-input5">Password</label>
          <input type="password" name="password" id="form-input5" onChange={handleInputChange} />
        </div>
        <div className="input-area">
          <label htmlFor="form-input6">Confirm Password</label>
          <input type="password" name="confirmPassword" id="form-input6" onChange={handleInputChange} />
        </div>
        <div className="btn">
          <button type="submit">Signup</button>
        </div>
        <p>Already have an account? <Link to={'/login'} >Login</Link></p>
        
      </form>
    </>
  )
}

export default Register;