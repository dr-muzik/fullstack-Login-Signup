import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import {  useAuth } from '../StateContext/AuthContext';
import axios from "axios";
import LoggedIn from "../pages/LoggedIn";
import Profile from "../pages/Profile";
import Quiz from "./StudyArena/Quiz";
import Chat from "../pages/Chat";
import Books from "./Books";
import Stats from "./Stats";
import UpdateProfile from "../pages/UpdateProfile";

// type Props = {};

const Dashboard:React.FC = () => {
    // const [menu, setMenu] = useState("welcome");

    const {setUser, logout, user} = useAuth()
    const Navigate = useNavigate();

    const logoutHandler = () => {
      setUser(null);
      axios.get("/api/v1/logout");
      logout();
      Navigate('/login');
  }

    let { id } = useParams();
   let data
    console.log(id);

    // 
    switch (id) {
      case (id = "Chat"):
        data = <Chat />;
        break;
      case (id = "Profile"):
        data = <Profile />;
        break;
      case (id = "Quiz"):
        data = <Quiz />;
        break;
        case (id = "Book-repository"):
          data = <Books />;
          break;
        case (id = "Stats"):
          data = <Stats />;
          break;
          case (id = "updateProfile"):
            data = <UpdateProfile />;
            break;
  
      default:
        data = <LoggedIn />;
    }

//creating the serverUrl variable to be used in displaying the image in the client
  const serverBaseUrl = 'http://localhost:8080';

  return (
    <div className="dashboard">
      <div className="header">
        <div className='image'><img src={`${serverBaseUrl}${user?.image_url}`} alt="profile_pic" /></div>
        <div className="logout-btn">
        <button type="submit" onClick={logoutHandler}><Link to={'/'}>Logout</Link></button>
        </div>
      </div>
      
    <main className="main">
        <aside>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard/Home">
                            <h3>Home</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/Profile">
                            <h3>Profile</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/Quiz">
                            <h3>Study Arena</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/Chat">
                            <h3>chat</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/Stats">
                            <h3>Progress</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/Book-repository">
                            <h3>Library</h3>
                        </Link>
                    </li>
                </ul>
            </nav>
       
        </aside>
        <section>
        {/* <h1>User Dashboard</h1> */}
         {id ? data : <Outlet />} 
        </section>
    </main>



    </div>
  );
};

export default Dashboard;
