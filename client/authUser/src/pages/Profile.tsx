import React from 'react'
import { useAuth } from '../StateContext/AuthContext'
import { Link } from 'react-router-dom';

// type Props = {}


const Profile:React.FC = () => {
    const {user} = useAuth();
  return (
    <>
    <h3>{user?.username} profile</h3>
        <table>
            <tr>
            <th>FirstName</th>
            <td>{user?.firstname}</td>
            </tr>

            <tr>
            <th>LastName</th>
            <td>{user?.lastname}</td>
            </tr>

            <tr>
            <th>UserName</th>
            <td>{user?.username}</td>
            </tr>

            <tr>
            <th>Email</th>
            <td>{user?.email}</td>
            </tr>
        </table>
        <button><Link to='/loggedin'>Back</Link></button>
    </>
  )
}

export default Profile