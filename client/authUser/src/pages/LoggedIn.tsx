import axios from 'axios'
import React, { useEffect, useState,  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../StateContext/AuthContext'


// type Props = {}

const LoggedIn:React.FC = () => {
    const { logout, setUser } = useAuth()

    const [name, setName] = useState("");
    const Navigate = useNavigate()

    useEffect(()=>{
        axios.get('/api/v1/getMe')
        .then(res => {
            console.log(res.data.message);
            if(res?.data?.message === 'success'){
                setName(res.data.userDetails.username);
                setUser(res?.data?.userDetails)
            }
        })
        .catch(err => (
            console.error('can\'t get user details', err)
        ))
    }, [])

    const logoutHandler = () => {
        setUser(null)
        axios.get("/api/v1/logout")
        logout()
        Navigate('/login')
    }

  return (
    <>
    
    <div>Welcome {name}</div>
    <button type="submit" onClick={logoutHandler}><Link to={'/'}>Logout</Link></button>
    <button type="button" ><Link to={'/profile'}>Profile</Link></button>
    </>
  )
}

export default LoggedIn