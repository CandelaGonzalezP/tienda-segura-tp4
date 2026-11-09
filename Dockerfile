FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY app.js ./

# No corras la app como root dentro del contenedor
USER node

EXPOSE 3000
CMD ["node", "app.js"]