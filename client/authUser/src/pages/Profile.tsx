import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUser, useAuth } from '../StateContext/AuthContext'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons'

// type Props = {}


const Profile:React.FC = () => {
    const {user, setUser} = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const active = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedFile(e.target.files?.[0] || null);
    };
    const serverBaseUrl = 'http://localhost:8080';

    useEffect(() => {
      // Use the selectedFile state after it has been updated
      if (selectedFile) {
        handleFileUpload();
      }
    }, [selectedFile]);
  
    const handleFileUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile!); // Use ! to assert that selectedFile is not null
  
        console.log('Sending request to update profile picture...');
        const dp = await axios.post('/api/v1/updateProfilePic', formData);
        console.log('Response from server:', dp);
  
        // if (!user) {
        //   return alert('Error in updating profile picture');
        // }
  
        console.log('Updating user with new image_url...');
        console.log("updated image", dp.data.data.image_url)
        setUser((prevUser) => ({
          ...prevUser!,
          image_url: `${dp.data.data.image_url}`,
        }));
        
        console.log("current image: ", user?.image_url);
        alert('Changed DP successfully!!!');
      } catch (error) {
        console.error("Couldn't update Profile Pic", error);
      }
    };

    // console.log("image to show: ", user);

  return (
    <>
    <h3>{user?.username} profile</h3>
    
    <div className='image'>
 
      <img key={user?.id} src={`${serverBaseUrl}${user?.image_url}`} alt="profile_pic" />
      <label htmlFor="dp" className='camIcon'>
      {/* <div className="icon">
      </div> */}
      <FontAwesomeIcon icon={faCamera} style={{ color: 'green', fontSize: '2.5em' }} />
      <input type="file" name="image" id="dp" style={{display: 'none'}} onChange={active} />
      </label>
      </div>
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
        <button style={{marginInlineEnd: '20px'}}><Link to='/loggedin'>Back</Link></button>
        <button><Link to='/updateProfile'>update details</Link></button>
    </>
  )
}

export default Profile