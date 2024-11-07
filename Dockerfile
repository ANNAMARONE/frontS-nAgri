# Utilisez l'image Node.js LTS
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app/react-docker

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./

# Installer les dépendances en utilisant npm ci pour une installation propre
RUN npm ci

# Copier tous les fichiers de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel Vite sera exécuté
EXPOSE 3000

# Lancer l'application avec npm et ajouter --host pour permettre l'accès réseau
CMD ["npm", "run", "dev", "--", "--host"]
