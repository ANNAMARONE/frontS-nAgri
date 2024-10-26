/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('Utilisateur récupéré :', user); 

  const isAuthenticated = user?.isAuthenticated || false; 
  const userRole = user?.role || null;

  console.log('Est authentifié :', isAuthenticated, 'Rôle de l\'utilisateur :', userRole);

  return (
    isAuthenticated && allowedRoles.includes(userRole) ? (
      <Outlet />
    ) : (
      <>
        {console.log('Accès refusé. Détails :', { isAuthenticated, userRole })}
        <Navigate to="/access-denied" replace />
      </>
    )
  );
};



// Validation des props
PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
