FROM node:15.9.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

USER 1000

CMD ["npm", "run", "start"]
