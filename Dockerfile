# syntax=docker/dockerfile:1.4

FROM oven/bun AS development

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos necessários para o contêiner
COPY ./package.json /app/package.json
#COPY ./bun.lockb /app/bun.lockb

# Instalar as dependências da aplicação
RUN bun install --verbose

# Copiar o restante do código-fonte para dentro do contêiner
COPY . /app

# Etapa 2: Preparação para produção com NGINX
FROM nginx:alpine AS app

WORKDIR /usr/share/nginx/html

# Remove os arquivos padrão do NGINX
#RUN rm -rf ./*

# Copia o build gerado na etapa anterior para o diretório correto no NGINX
#COPY --from=build /app/dist/f5sites-angular-nossr-typescript-2024 /usr/share/nginx/html

# Copia o build gerado na etapa anterior para o diretório correto no NGINX
COPY --from=development /app/ /usr/share/nginx/html


# Exponha a porta padrão do NGINX
EXPOSE 80

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]
