FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install


EXPOSE 3000

CMD ["node", "app.js"]
