FROM node:18-alpine
LABEL authors="Julio Filizzola"

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env.example .env

RUN yarn

COPY . .

CMD ["yarn", "run", "start:dev"]