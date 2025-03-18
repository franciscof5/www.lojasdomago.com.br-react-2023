# syntax=docker/dockerfile:1.4

# Etapa 1: Construção com Bun
FROM node:18-alpine AS build

WORKDIR /app

# Copiar apenas os arquivos essenciais
COPY package.json ./
COPY package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Rodar o build corretamente
RUN npm run build
RUN ls -l /app
# Verifique o conteúdo da pasta dist
RUN ls -l /app/dist

FROM nginx:alpine AS app


WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Etapa 2: Servir com NGINX

# Copiar o build gerado para o diretório correto do NGINX
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
