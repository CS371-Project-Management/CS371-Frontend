FROM node:22.14-alpine

USER node

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .


CMD ["npm", "run", "dev"]