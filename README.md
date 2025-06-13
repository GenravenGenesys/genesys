This project was created to be a fully functional Genesys RPG Virtual Table Top and GM Lore and Homebrew Content Creation Tool built by a solo devloper with a love for the Genesys RPG.

For those wishing to run the codebase locally. Follow the following directions.

CLIENT

Install node and npm
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Usee npm ci to install all the client dependencies

Use npm run start to run the program locally.

GRADLE JAVA SERVER

Repository is using Java 21, and Springboot 3.4.x

Backend Server is run with ./gradlew clean build bootRun

Adding a connection string:
Create an .env file in the server root directory.

File only needs to define the connection string as ATLAS_MONGODB_URI.

MongoDB
Currently using Atlas provided by MongoDB, which will hold 512MB of data for free. The application can also be used by a local or docker version using a different connection string.
Guide for creating an Atlas Cluster: https://www.mongodb.com/docs/atlas/getting-started/