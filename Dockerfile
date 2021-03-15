FROM node:14-buster-slim AS builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm ci

COPY . ./

CMD npm run start:dev
