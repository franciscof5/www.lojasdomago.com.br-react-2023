# syntax=docker/dockerfile:1.4

# Etapa 1: Construção com Bun
FROM oven/bun AS build

WORKDIR /app

# Copiar apenas os arquivos essenciais
COPY package.json bun.lockb ./

# Instalar dependências
RUN bun install --frozen-lockfile

# Copiar o restante dos arquivos do projeto
COPY . .

# Rodar o build corretamente
RUN bun run build

# Etapa 2: Servir com NGINX
FROM nginx:alpine AS app

# Copiar o build gerado para o diretório correto do NGINX
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
