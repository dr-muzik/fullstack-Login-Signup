
// import './App.css'
import "./../node_modules/bootstrap/scss/bootstrap.scss";
import './styles/index.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import LoggedIn from './pages/LoggedIn';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from './StateContext/AuthContext';
import Unauthorized from './pages/Unauthorized';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import Chat from './pages/Chat';
import OtherProtectedRoute from './Component/OtherProtectedRoute';
import Dashboard from './dashboard/Dashboard';
import GameInt from './Interface/GameInt';
import SubmitInt from './Interface/SubmitInt';
import Details from './Component/Details';
import Quiz from "./dashboard/StudyArena/Quiz";


const App = () => {


  return (
    <AuthProvider>

    <div className='App'>
     <Router>
        <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Register />} />
              <Route path='/unauthorised' element={<Unauthorized />} />

              {/* protected routes */}
              <Route element={<ProtectedRoute />} >
              <Route path= "/dashboard/:id" element={<Dashboard />} />
              {/* <Route path={'loggedin'} element={<LoggedIn />} />
              <Route path={'quiz'} element={<Quiz />} />
              <Route path={'profile'} element={<Profile />} />
              <Route path={'updateProfile'} element={<UpdateProfile />} /> */}
              
              <Route path="/gameInt/:quizId" element={<GameInt />} />
              <Route path="/submit" element={<SubmitInt />} />
              <Route path="/submit/:id" element={<Details />} />
            
                <Route path={'/Chat'} element={<Chat />} />
              </Route>

              <Route element={<OtherProtectedRoute />}>
              </Route>

              <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
     </Router>
    </div>
    </AuthProvider>
  )
}

export default App
