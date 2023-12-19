
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import LoggedIn from './pages/LoggedIn';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from './StateContext/AuthContext';


const App = () => {


  return (
    <AuthProvider>

    <div className='App'>
     <Router>
        <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Register />} />
              {/* <Route path="/loggedin" element={<ProtectedRoute element={<LoggedIn />} />} /> */}
              <Route element={<ProtectedRoute />}>

              <Route path={'/loggedin'} element={<LoggedIn />} />
              </Route>
              <Route path='/login' element={<Login />} />
              {/* <Route path='/loggedin' element={<LoggedIn />} /> */}
            </Route>
        </Routes>
     </Router>
    </div>
    </AuthProvider>
  )
}

export default App
