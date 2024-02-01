import '../styles/loggedin.css';

import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../StateContext/AuthContext'


// type Props = {}

const LoggedIn:React.FC = () => {
    const { setUser, user } = useAuth()

    // const [name, setName] = useState("");
    // const Navigate = useNavigate()

    useEffect(()=>{
        axios.get('/api/v1/getMe')
        .then(res => {
            console.log(res.data.message);
            if(res?.data?.message === 'success'){
                // setName(res.data.userDetails.username);
                setUser(res?.data?.userDetails)
                // setId(res?.data?.userDetails.id)
            }
        })
        .catch(err => (
            console.error('can\'t get user details', err)
        ))
    }, [])

    

    

  return (
    <>
    {/* */}
    <h1>Welcome {user?.username}</h1>
 
    </>
  )
}

export default LoggedIn