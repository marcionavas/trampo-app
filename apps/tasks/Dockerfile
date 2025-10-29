
FROM node:20-alpine AS production
WORKDIR /app

# Copia arquivos de configuração e dependências da raiz do monorepo
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copia artefatos já buildados do host
COPY dist/apps/tasks ./dist/apps/tasks

# Instala apenas dependências de produção
RUN npm ci --omit=dev

EXPOSE 3003
CMD ["node", "dist/apps/tasks/main.js"]