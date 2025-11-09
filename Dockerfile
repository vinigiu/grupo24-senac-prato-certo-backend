# Etapa única (ambiente de desenvolvimento)
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia os arquivos de dependência primeiro
COPY package*.json ./

# Instala TODAS as dependências (inclui as devDependencies, onde está o @nestjs/cli)
RUN npm install

# Copia o resto do código
COPY . .

# Exponha a porta padrão do Nest
EXPOSE 3000

# Comando padrão: iniciar o app em modo de desenvolvimento (hot reload)
CMD ["npm", "run", "start:dev"]