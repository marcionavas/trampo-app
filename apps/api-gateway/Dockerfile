
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

# Build do microserviço e suas dependências (libs)
WORKDIR /app
RUN npx nx build api-gateway

# Stage de desenvolvimento (hot reload)
FROM node:20-alpine AS development
WORKDIR /app/apps/api-gateway

COPY --from=builder /app /app

EXPOSE 3000
CMD ["npm", "run", "start:dev:nodemon"]

# Stage de produção
FROM node:20-alpine AS production
WORKDIR /app

# Copia apenas arquivos necessários da build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/nx.json ./
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/dist/apps/api-gateway ./dist/apps/api-gateway

# Instala apenas dependências de produção
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/apps/api-gateway/main.js"]