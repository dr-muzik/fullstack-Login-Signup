import React from 'react';
import { Route, Navigate, Routes, Outlet } from 'react-router-dom';
import { useAuth } from '../StateContext/AuthContext';
// import LoggedIn from './LoggedIn';

interface ProtectedRouteProps {
//   path: string;
//   element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { authState } = useAuth();

  return authState.isAuthenticated ? (
    
        // <Route path={path} element={element} />
        <Outlet/>
   
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
