/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '/src/components/pages/Auth/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur n'a pas le rôle requis, afficher une page "Accès refusé"
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/access-denied" />;
  }

  // Si tout est OK, afficher le composant enfant
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
