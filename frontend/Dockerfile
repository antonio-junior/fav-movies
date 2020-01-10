FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install npm@latest -g
COPY . .
RUN npm install
EXPOSE 8080
RUN touch .env
CMD [ "npm", "run", "dev"]