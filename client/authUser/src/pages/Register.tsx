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
  

  interface Ireg {
    images: FormData;
    input: IUser[];
  }

const Register = () => {
    const [data, setData] = useState<Ireg[] | null>(null)
    const [input, setInput] = useState<IUser[]>([{
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }])
    
      const [file, setFile] = useState<File | null>(null);

    
      const submitHandler = async(e: React.FormEvent) => {
        e.preventDefault();

        // FILE start
        if (!file) {
          console.error("Please select a file");
          return;
        }
    
        const User = new FormData();
        User.append('image', file);
        User.append('email', input[0].email);
        User.append('firstname', input[0].firstname);
        User.append('lastname', input[0].lastname);
        User.append('password', input[0].password);
        User.append('confirmPassword', input[0].confirmPassword);
        User.append('username', input[0].username)
        

          // Create a new object with 'images' and 'input' properties
      // const newUserData: Ireg = {
      //   images: new FormData(),
      //   input: [...input] // Assuming you want to copy the input array
      // };

      // newUserData.images.append('image', file);

      // Update the 'data' array with the new user data
      // setData((prevData) => (prevData ? [...prevData, newUserData] : [newUserData]));
      // setData(([newUserData]));


      // Now 'data' contains the new user data with image details
      
    

        try {
            //  const result =    await axios.post('/api/v1/register', input[0]);
            const result = await axios.post('/api/v1/register', User)
            if(result){
              return alert("You have successfully registerd!!")
            }
            // console.log("The result is: ", result);
            // console.log(input)
        } catch (error) {
            console.error("error submitting data", error);
        }

        // Handle the submission logic here
        // console.log('Form submitted:', input[0]);
        // console.log('Updated Data:', data);
    
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
        <div className="input-area">
          {/* <label htmlFor="form-input6">Confirm Password</label> */}
          <input type="file" name="image" id="form-input6" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} />
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