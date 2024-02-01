import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../StateContext/AuthContext';
// import LoggedIn from './LoggedIn';

// interface ProtectedRouteProps {
// //   path: string;
// //   element: React.ReactNode;
// }

const OtherProtectedRoute: React.FC = () => {
  const { authState } = useAuth();

  return authState.isAuthenticated ? (
    <>
        {/* <h1>Welcome to your Dashboard</h1> */}
        {/* // <Route path={path} element={element} /> */}
        <Outlet/>
    </>
   
  ) : (
    <>
    {alert('not authenticated')}
    <Navigate to="/login" />
    </>
  );
};

export default OtherProtectedRoute;
