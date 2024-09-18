FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3003

CMD ["npm","run","dev"]