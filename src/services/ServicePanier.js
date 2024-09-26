import axios from 'axios';

const API_URL = 'http://votre-api-url/api/commandes';

export const createCommande = async (commande) => {
    const response = await axios.post(API_URL, commande);
    return response.data;
};