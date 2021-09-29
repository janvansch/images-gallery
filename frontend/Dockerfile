FROM node:15.14-alpine

RUN mkdir /app && chown node:node /app

WORKDIR /app

EXPOSE 3000

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --silent && chown node:node /app/node_modules

COPY --chown=node:node . ./

CMD ["npm", "start"]