FROM node:20 as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && \
    npm run migrate && \
    npm run dbpush

CMD [ "npm", "run", "start:dev" ]

FROM node:20 as production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "/app/dist/main.js"]
