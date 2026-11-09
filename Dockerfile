FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias e instalarlas (usamos ci para ser exactos con package-lock.json)
COPY package*.json ./
RUN npm ci

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto (por convención de Express)
EXPOSE 3000

# Cambiar a un usuario sin privilegios por seguridad
USER node

# Comando para iniciar la app
CMD ["node", "app.js"]