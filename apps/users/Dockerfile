# Stage de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia arquivos de configuração e dependências da raiz do monorepo
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest.config.js ./

# Instala dependências
RUN npm ci

# Copia código do microserviço e libs compartilhadas
COPY apps /app/apps
COPY libs /app/libs
RUN ls -l /app/apps/users/test || echo "test folder not found"

# Build do microserviço e suas dependências (libs)
WORKDIR /app
RUN npx nx build users

# Stage de desenvolvimento (hot reload)
FROM node:20-alpine AS development
WORKDIR /app/apps/users

COPY --from=builder /app /app

EXPOSE 3002
CMD ["npm", "run", "start:dev:nodemon"]

# Stage de produção
FROM node:20-alpine AS production
WORKDIR /app

# Copia apenas arquivos necessários da build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/nx.json ./
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/dist/apps/users ./dist/apps/users
COPY --from=builder /app/dist/libs ./dist/libs

# Instala apenas dependências de produção
RUN npm ci --omit=dev

EXPOSE 3002
CMD ["node", "dist/apps/users/main.js"]