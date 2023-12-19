import axios from 'axios'
import React, { useEffect, useState,  } from 'react'
import { Link, useNavigate, redirect } from 'react-router-dom'


// type Props = {}

const LoggedIn:React.FC = () => {

    const [name, setName] = useState("");
    const Navigate = useNavigate()

    useEffect(()=>{
        axios.get('/api/v1/getMe')
        .then(res => {
            console.log(res.data.message);
            if(res?.data?.message === 'success'){
                setName(res.data.userDetails.username);
            }
        })
        .catch(err => (
            console.error('can\'t get user details', err)
        ))
    }, [])

    const logout = () => {
        axios.get("/api/v1/logout")
        Navigate('/login')
    }

  return (
    <>
    
    <div>Welcome {name}</div>
    <button type="submit" onClick={logout}><Link to={'/'}>Logout</Link></button>
    </>
  )
}

export default LoggedIn