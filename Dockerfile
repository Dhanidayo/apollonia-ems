FROM node:18.17.1-alpine
WORKDIR /index
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 9090
CMD [ "node", "app.js" ]