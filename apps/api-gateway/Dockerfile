
FROM node:20-alpine AS production
WORKDIR /app

# Copia arquivos de configuração e dependências da raiz do monorepo
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copia artefatos já buildados do host
COPY dist/apps/api-gateway ./dist/apps/api-gateway

# Instala apenas dependências de produção
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/apps/api-gateway/main.js"]