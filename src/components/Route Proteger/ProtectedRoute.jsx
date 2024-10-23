/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '/src/components/pages/Auth/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useAuth();
  
  const role = user?.role;
  const hasAccess = isLoggedIn && allowedRoles.includes(role);

  // Si l'utilisateur n'est pas connecté, redirigez vers la page de connexion
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur n'a pas accès, redirigez vers la page d'accès refusé
  if (!hasAccess) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />; // Rendre les enfants si toutes les conditions sont remplies
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
