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
  

  // interface Ireg {
  //   images: FormData;
  //   input: IUser[];
  // }

const Register = () => {
    // const [data, setData] = useState<Ireg[] | null>(null)
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
 
         

      <div className="reg">
      <form className="row g-3"  onSubmit={submitHandler} >
        <h2 style={{textAlign: "center"}} className="text-primary-emphasis">Sign Up</h2>
        <div className="col-md-12">
          {/* <label htmlFor="inputEmail4" className="form-label">
            FirstName
          </label> */}
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-12">
          {/* <label htmlFor="inputPassword4" className="form-label">
            LastName
          </label> */}
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-12">
          {/* <label htmlFor="username" className="form-label">
            Username
          </label> */}
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            placeholder="UserName"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-12">
          {/* <label htmlFor="inputEmail4" className="form-label">
            Email
          </label> */}
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          {/* <label htmlFor="inputPassword4" className="form-label">
            Password
          </label> */}
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          {/* <label htmlFor="inputPassword4" className="form-label">
            Password
          </label> */}
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm password"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-12">
        <input type="file" name="image" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} />
        </div>
       
        
        {/* <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" />
        </div> */}
       
   
        
        <div className="col-12">
          <button type="submit" className="btn btn-primary col-12 p-3">
            Sign up
          </button>
        </div>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
      </form>
    </div>
   
  )
}

export default Register;