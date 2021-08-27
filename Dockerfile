FROM node:current

WORKDIR /app

COPY package.json /app/package.json
RUN yarn install

COPY nuxt.config.js /app/nuxt.config.js
COPY . /app

CMD yarn dev
