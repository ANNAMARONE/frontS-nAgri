/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '/src/config';
import './gestionRole.css'
const Gestionrole = () => {
    const [roles, setRoles] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');
    const [editRole, setEditRole] = useState(null);
    const [message, setMessage] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);

    useEffect(() => {
        fetchRoles();
        fetchPermissions(); 
    }, []);

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
            setMessage('Erreur lors du chargement des rôles.');
            console.error('Erreur lors du chargement des rôles:', error);
        }
    };

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
            setNewRoleName('');
            fetchRoles();
        } catch (error) {
            setMessage('Erreur lors de l\'ajout du rôle.');
            console.error('Erreur lors de l\'ajout du rôle:', error);
        }
    };

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
            setMessage('Erreur lors de la suppression du rôle.');
            console.error('Erreur lors de la suppression du rôle:', error);
        }
    };

    const updateRole = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${config.apiBaseUrl}/roles/${editRole.id}`, { name: editRole.name }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMessage(response.data.message);
            setEditRole(null);
            fetchRoles();
        } catch (error) {
            setMessage('Erreur lors de la mise à jour du rôle.');
            console.error('Erreur lors de la mise à jour du rôle:', error);
        }
    };

    const openPopover = async (role) => {
        setCurrentRole(role);
        setShowPopover(true);
        await fetchPermissions(); 
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiBaseUrl}/roles/${role.id}/permissions`, { 
                headers: { 'Authorization': `Bearer ${token}` },
            });
    
            // Vérifier si les données de la réponse sont correctement formatées
            const assignedPermissions = Array.isArray(response.data.data)
                ? response.data.data.map((permission) => permission.id)
                : [];
    
            // Mettre à jour les permissions sélectionnées
            setSelectedPermissions(assignedPermissions);
            console.log("Permissions du rôle :", assignedPermissions);
        } catch (error) {
            console.error('Erreur lors de la récupération des permissions du rôle :', error);
        }
    };
    

    const fetchPermissions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiBaseUrl}/permissions`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setPermissions(response.data);  
        } catch (error) {
            setMessage('Erreur lors du chargement des permissions.');
            console.error('Erreur lors du chargement des permissions:', error);
        }
    };
    
    const closePopover = () => {
        setShowPopover(false);
        setCurrentRole(null);
        setSelectedPermissions([]);  
    };

    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions((prevSelected) =>
            prevSelected.includes(permissionId)
                ? prevSelected.filter((id) => id !== permissionId) 
                : [...prevSelected, permissionId]
        );
    };
    
    const updatePermissions = async () => {
        if (!currentRole) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${config.apiBaseUrl}/roles/${currentRole.id}/permission`,
                { permissionIds: selectedPermissions }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setMessage('Permissions mises à jour avec succès',response );
            closePopover();
        } catch (error) {
            setMessage('Erreur lors de la mise à jour des permissions.');
            console.error('Erreur lors de la mise à jour des permissions:', error);
        }
    };

    return (
        <div className='gestionrole'>
            <h1>Gestion des Rôles</h1>
            {message && <p>{message}</p>}

            <ul className='afficherole'>
                {roles.map((role) => (
                    <li key={role.id} className='afficheRoleli'>
                        {role.name}{' '}
                        <button onClick={() => deleteRole(role.id)}>Supprimer</button>
                        <button onClick={() => setEditRole(role)}>Modifier</button>
                        <button onClick={() => openPopover(role)}>Voir Détails</button>
                    </li>
                ))}
            </ul>

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

            {showPopover && (
            <div className="popover">
            <h2>Détails du Rôle : {currentRole.name}</h2>
            <div className="permissions-container">
                {permissions.map((permission) => (
                    <div className="permission-card" key={permission.id}>
                        <input
                            type="checkbox"
                            checked={selectedPermissions.includes(permission.id)} 
                            onChange={() => handlePermissionChange(permission.id)}
                        />
                        <label>{permission.name}</label>
                    </div>
                ))}
            </div>
        
            <button onClick={updatePermissions} className='buttonActionRole'>Enregistrer les Modifications</button>
            <button onClick={closePopover} className='buttonActionRoleClose'>Fermer</button>
        </div>
        
            )}
        </div>
    );
};

export default Gestionrole;
