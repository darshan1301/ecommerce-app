FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_STRIPE_PK="pk_test_51P12CTSEgQluV2glVtoDLsI44paxKTmNKIyAE0EvmzieXAXoFxmKNlIHRRmocQQlOsAy5u2oSfoYWgIUhB7H9Gw700dWZHx8HY"


EXPOSE 5173

CMD npm run dev