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
            console.log(result?.data);
            if(result.data.token){
                navigate('/loggedIn');
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
    <div>
         <form action=""  onSubmit={submitHandler}>
        <h1>Login</h1>
       
        <div className="input-area">
          <label htmlFor="form-input">Email</label>
          <input type="text" name="email" id="form-input" onChange={handleInputChange} />
        </div>
        <div className="input-area">
          <label htmlFor="form-input">Password</label>
          <input type="text" name="password" id="form-input" onChange={handleInputChange} />
        </div>
        
        <div className="btn">
          <button type="submit">login</button>
        </div>
        <p>Don't have an account? <Link to={'/'} >Register</Link></p>
        
      </form>
    </div>
  )
}

export default Login