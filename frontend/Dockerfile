FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install npm@latest -g
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.15-alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]