# Imagem base
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY . .

# Instala dependências
RUN npm install

# Build do projeto
RUN npm run build auth

# Porta do serviço
EXPOSE 3001

# Comando para iniciar o serviço
CMD ["node", "dist/apps/auth/main.js"]