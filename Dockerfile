FROM node:14-buster-slim AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

CMD npm run start:dev
