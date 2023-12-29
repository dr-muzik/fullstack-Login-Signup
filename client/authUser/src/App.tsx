
import './App.css'

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
              <Route element={<ProtectedRoute />}>
              <Route path={'/loggedin'} element={<LoggedIn />} />
              <Route path={'/profile'} element={<Profile />} />
              <Route path={'/updateProfile'} element={<UpdateProfile />} />
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
