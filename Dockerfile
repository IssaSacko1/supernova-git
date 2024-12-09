# Utilise une image Node.js avec la bonne version
FROM node:20.12.0

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances de l'application
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Construit l'application pour la production
RUN npm run build

# Installe le package serve globalement pour servir l'application
RUN npm install -g serve

# Expose le port sur lequel l'application tournera
EXPOSE 3000

# Commande pour lancer l'application
CMD ["serve", "-s", "build", "-l", "3000"]
