/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRouteLogin= () => {

const user = JSON.parse(localStorage.getItem('user'));

  console.log('Utilisateur récupéré :', user); 

  const isAuthenticated = user?.isAuthenticated || false;

  console.log('Est authentifié :', isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRouteLogin
