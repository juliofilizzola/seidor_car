FROM node:18-alpine
LABEL authors="Julio Filizzola"

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn

RUN touch .env

COPY . .

COPY .env.example .env

CMD ["yarn", "run", "start:dev"]
