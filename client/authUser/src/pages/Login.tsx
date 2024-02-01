import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
;
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../StateContext/AuthContext';

interface IUser {
    email: string;
    password: string;
  }

const Login = () => {
    const { login } = useAuth()

    const [input, setInput] = useState<IUser>({
        email: "",
        password: ""
      })

      const navigate = useNavigate();

      axios.defaults.withCredentials = true;
    

    const submitHandler = async (event: React.FormEvent) =>{
        // throw new Error('Function not implemented.');
        event.preventDefault();
        try {
            
            const result = await axios.post('/api/v1/login', input)
            // setUser(result?.data);
            if(result.data.token){
                navigate('/dashboard/loggedIn');
                login();
            }
     
             console.log(input)
        } catch (error) {
            console.log('LOGGIN DATA', error)
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput(prevState => (
              {
                ...prevState,
                [name]: value
            }
        ))
    }

  return (
    

      <div className="login">
      <form action="" className="row g-3" onSubmit={submitHandler}>
        <h2 style={{textAlign: "center"}}>Login</h2>
        <div className="col-md-12">
          <label htmlFor="inputUsername" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            name="email"
            placeholder="Email"
            onChange={handleInputChange} 
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">
            Password:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPassword"
            name="password"
            placeholder="Enter password"
            onChange={handleInputChange} 
          />
        </div>
        <div className="d-grid gap-2">
   
            <button className="btn btn-primary col-12 p-3" type="submit">
              LOGIN
            </button>
     
        </div>
        <p>
          Don't have an account yet? <Link to="/">Signup</Link>
        </p>
      </form>
    </div>
    
  )
}

export default Login