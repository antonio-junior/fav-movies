<h1 align="center">
    <img height="150px" src="https://github.com/antonio-junior/fav-movies/blob/master/frontend/src/assets/logofull.png" />
</h1>

# Favmovies :movie_camera: + :heart:

Monorepo project using react stack and third party components.

Features:

- Totally responsive
- Login using Social Credentials (Google, Facebook, Github)
- Search for movies
- View movie details (description, rating, year, gender)
- Save movies as favorite
- Remove movies from favorites
- Associate new images to a movie (using Amazon S3)
- Dashboard with Favorites Summary (total, movies by year, by gender)

# :link: Link

https://favmovies-app.herokuapp.com/

# :rocket: Stack

- [npm](https://www.npmjs.com) - Node Package Manager
- [monorepo-run](https://github.com/Akryum/monorepo-run#readme) - Run scripts in monorepo with colors, streaming and separated panes
- [ESLint](https://eslint.org/) - JavaScript linting utility
- [Prettier](https://prettier.io/) - Code formatter
- [heroku](https://www.heroku.com/) - Platform as a service for deploying and running apps
- [dotenv](https://github.com/motdotla/dotenv#readme) - Module that loads environment variables from a .env file into process.env

## External Services

- [OMDB](http://www.omdbapi.com/) - RESTful web service to obtain movie information
- [Amazon AWS S3](https://aws.amazon.com/pt/s3/) - Secure, Durable & Highly-Scalable Object Storage.

## Backend

- [nodeJS](https://nodejs.org/en/) - JavaScript runtime
- [mongodb](https://www.mongodb.com/) - most popular NoSQL database
- [express](https://www.mongodb.com/) - Web application framework for Node.js
- [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JsonWebToken implementation for node.js
- [node-restful](https://www.npmjs.com/package/node-restful) - library for quickly providing a REST API with express
- [nodemon](https://nodemon.io/) - Simple monitor script for use during development of a node.js app

## Frontend

- [react (and hooks)](https://pt-br.reactjs.org/) - JavaScript library for building user interfaces.
- [webpack](https://webpack.js.org/) - Module bundler
- [bit.dev](https://bit.dev/) - Host and organize reusable components
- [react-bootstrap](https://react-bootstrap.github.io/) - Bootstrap components built with React
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome) - The internet's most popular icon toolkit
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [react-toastify](https://fkhadra.github.io/react-toastify/) - React notification
- [React-ApexChart](https://apexcharts.com/docs/react-charts/) - React Chart wrapper for ApexCharts.js

# :white_check_mark: Setup

## Prerequisites
* Node.js
* NPM

Clone this repo and choose:

## Docker Compose

1. Fill docker-compose.yaml environment variables.

2. Run Docker Compose
```
docker-compose up
```
Access default docker-machine ip. Ex: 192.168.99.100 

## Locallly

1. install dependencies:
```
npm install
```

2. Create a .env file from template:

2.1 **backend/.env**:
```
DB_URL=mongodb+srv://...
AUTH_SECRET=
```

2.2 **frontend/.env**:
```
OMDB_API_KEY=
AWS_SECRET_KEY=
AWS_BUCKET_NAME=
AWS_REGION=
AWS_ACCESS_KEY_ID=
API_ENDPOINT=http://localhost:3003/api
```

3. Run
```
npm run dev
```

<img src="https://github.com/antonio-junior/fav-movies/blob/master/monorepo.png" />

# :pencil2: How to contribute

-   Make a fork;
-   Create a branck with your feature:  `git checkout -b my-feature`;
-   Commit changes:  `git commit -m 'feat: My new feature'`;
-   Make a push to your branch:  `git push origin my-feature`.

After merging your receipt request to done, you can delete a branch from yours.

# :memo: License
This project is under the MIT license. See the [LICENSE](https://github.com/antonio-junior/fav-movies/blob/master/LICENSE) for more information.

----------
