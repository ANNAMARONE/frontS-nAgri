import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';

const Gestionrole = () => {
    const [roles, setRoles] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');
    const [editRole, setEditRole] = useState(null); // Correction ici pour définir le rôle modifié
    const [permissionId, setPermissionId] = useState('');
    const [message, setMessage] = useState('');

    // Charger la liste des rôles au montage du composant 
    useEffect(() => {
        fetchRoles();
    }, []);

    // Fonction pour récupérer tous les rôles
    const fetchRoles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiBaseUrl}/roles`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setRoles(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des rôles:', error);
        }
    };

    // Fonction pour ajouter un nouveau rôle
    const addRole = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${config.apiBaseUrl}/ajout_roles`, { name: newRoleName }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            setMessage(response.data.message);
            setNewRoleName(''); // Réinitialiser le champ d'entrée
            fetchRoles(); // Récupérer la liste mise à jour des rôles
        } catch (error) {
            console.error('Erreur lors de l\'ajout du rôle:', error);
            setMessage('Erreur lors de l\'ajout du rôle.'); // Afficher un message d'erreur
        }
    };

    // Fonction pour supprimer un rôle
    const deleteRole = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${config.apiBaseUrl}/roles/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMessage(response.data.message);
            fetchRoles();
        } catch (error) {
            console.error('Erreur lors de la suppression du rôle:', error);
        }
    };

    // Fonction pour mettre à jour un rôle
    const updateRole = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${config.apiBaseUrl}/roles/${editRole.id}`, { name: editRole.name }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMessage(response.data.message);
            setEditRole(null); // Réinitialiser l'état d'édition
            fetchRoles();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle:', error);
        }
    };

    // Fonction pour ajouter une permission à un rôle
    const givePermission = async (roleId) => {
        if (!roleId) {
            setMessage('Veuillez sélectionner un rôle.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${config.apiBaseUrl}/roles/${roleId}/permission`, { permissionId }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            setMessage(response.data.message);
            setPermissionId(''); // Réinitialiser le champ d'entrée
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la permission:', error);
        }
    };

    return (
        <div>
            <h1>Gestion des Rôles</h1>
            {message && <p>{message}</p>}

            {/* Liste des rôles */}
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>
                        {role.name}{' '}
                        <button onClick={() => deleteRole(role.id)}>Supprimer</button>
                        <button onClick={() => setEditRole(role)}>Modifier</button>
                    </li>
                ))}
            </ul>

            {/* Formulaire d'ajout de rôle */}
            <div>
                <h2>Ajouter un Rôle</h2>
                <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="Nom du rôle"
                />
                <button onClick={addRole}>Ajouter</button>
            </div>

            {/* Formulaire de modification de rôle */}
            {editRole && (
                <div>
                    <h2>Modifier le Rôle</h2>
                    <input
                        type="text"
                        value={editRole.name}
                        onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
                        placeholder="Nouveau nom du rôle"
                    />
                    <button onClick={updateRole}>Enregistrer</button>
                    <button onClick={() => setEditRole(null)}>Annuler</button>
                </div>
            )}

            {/* Formulaire d'ajout de permission */}
            <div>
                <h2>Ajouter une Permission à un Rôle</h2>
                <input
                    type="number"
                    value={permissionId}
                    onChange={(e) => setPermissionId(e.target.value)}
                    placeholder="ID de la permission"
                />
                <button onClick={() => givePermission(editRole ? editRole.id : null)}>Ajouter la Permission</button>
            </div>
        </div>
    );
};

export default Gestionrole;
