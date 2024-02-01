
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useAuth } from '../StateContext/AuthContext';
import { Link } from 'react-router-dom';

// type Props = {}
interface IUser {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
  }
  

const UpdateProfile = () => {
    const {user} = useAuth();


    const [newData, setNewData] = useState<IUser>({
        firstname: user?.firstname || "",
        lastname: user?.lastname ||"",
        username: user?.username || "",
        email: user?.email || ""
    })
    // const [newData, setNewData] = useState<IUser[] | null>(null)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

       
        setNewData((prev) => ({
            ...prev, // Handle the case where newData is initially null
            [name]: value
          }));
    }

    const submitHandler = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await axios.post('/api/v1/updateMe', newData)
           
                console.log(result);
                
                return alert("You have successfully updated your details");
              
        } catch (error) {
            console.error("error submitting result", error);
        }
    }



  return (
    <div className='updateProfile'>
    {/* <Link to={'/loggedin'}>back</Link> */}
    <form action=""  onSubmit={submitHandler} method='post'>
    <h3>Update profile</h3>

    <div className="form-container">

      <label htmlFor="form-input1">Firstname</label>
      <input type="text" name="firstname" value={newData?.firstname} id="form-input1" onChange={handleInputChange} />
    
    
      <label htmlFor="form-input2">Lastname</label>
      <input type="text" name="lastname" value={newData?.lastname}  id="form-input2" onChange={handleInputChange} />
    
    
      <label htmlFor="form-input3">Username</label>
      <input type="text" name="username" value={newData?.username}  id="form-input3" onChange={handleInputChange} />
    
    
      <label htmlFor="form-input4">Email</label>
      <input type="text" name="email" value={newData?.email}  id="form-input4" onChange={handleInputChange} />
    
   
    </div>
    {/* 
      <input type="file" name="image" id="form-input6" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} />
     */}
    <div className="btn">
      <button type="submit">update</button>
    </div>
    
    
  </form>
    </div>
  )
}

export default UpdateProfile