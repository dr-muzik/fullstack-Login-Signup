import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuth } from '../StateContext/AuthContext';
import Dashboard from '../dashboard/Dashboard';
import GameInt from '../Interface/GameInt';
import SubmitInt from '../Interface/SubmitInt';
import Details from '../Component/Details';
// import LoggedIn from './LoggedIn';

// interface ProtectedRouteProps {
// //   path: string;
// //   element: React.ReactNode;
// }

const ProtectedRoute: React.FC = () => {
  const { authState } = useAuth();

  return authState.isAuthenticated ? (
    <>
      {/* <Dashboard /> */}
      {/* <Route path= "/dashboard/:id" element={<Dashboard />} />
      <Route path="/gameInt/:quizId" element={<GameInt />} />
      <Route path="/submit" element={<SubmitInt />} />
      <Route path="/submit/:id" element={<Details />} /> */}
      <Outlet />
    </>
    
   
  ) : (
    <>
    {alert('not authenticated')}
    <Navigate to="/login" />
    </>
  );
};

export default ProtectedRoute;
