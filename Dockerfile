FROM node:15.8.0-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

USER 1000

CMD ["npm", "run", "start"]
