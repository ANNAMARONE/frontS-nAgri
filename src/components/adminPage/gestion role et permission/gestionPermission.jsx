/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gestionPermission.css'; // Vérifiez que le nom du fichier CSS est correct
import config from '/src/config';

const GestionPermission = () => {
    const [permissions, setPermissions] = useState([]);
    const [name, setName] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');

    // Charger les permissions au démarrage
    useEffect(() => {
        fetchPermissions();
    }, []);
    const fetchPermissions = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${config.apiBaseUrl}/permissions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPermissions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des permissions:', error);
        }
    };
    

    const addPermission = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${config.apiBaseUrl}/permissions`, { name },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPermissions([...permissions, response.data.permission]);
            setName('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la permission:', error);
        }
    };

    const modifierPermission = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${config.apiBaseUrl}/permissions/${id}`, 
                { name: editName }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPermissions(permissions.map((perm) => (perm.id === id ? response.data.permission : perm)));
            setEditId(null);
            setEditName('');
        } catch (error) {
            console.error('Erreur lors de la modification de la permission:', error);
        }
    };
    
    const supprimerPermission = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${config.apiBaseUrl}/permissions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPermissions(permissions.filter((perm) => perm.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la permission:', error);
        }
    };
    

    return (
        <div className="gestion-des-permissions">
            <h2>Gestion des Permissions</h2>

            {/* Ajouter une permission */}
            <div>
                <input
                    type="text"
                    placeholder="Nom de la permission"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={addPermission}>Ajouter</button>
            </div>

            {/* Lister les permissions */}
            <ul>
                {permissions.map((permission) => (
                    <li key={permission.id}>
                        {editId === permission.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <button onClick={() => modifierPermission(permission.id)}>Enregistrer</button>
                                <button onClick={() => setEditId(null)}>Annuler</button>
                            </>
                        ) : (
                            <>
                                {permission.name}
                                <button onClick={() => { setEditId(permission.id); setEditName(permission.name); }}>
                                    Modifier
                                </button>
                                <button onClick={() => supprimerPermission(permission.id)}>Supprimer</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionPermission;
