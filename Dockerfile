# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copiar arquivos necessários
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Gerar Prisma Client novamente para produção
RUN npx prisma generate

EXPOSE 4000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]

