# ShortLink Project
#### Video Demo : https://youtu.be/lBONmGHhFDA
#### Description:
**ShortLink** is a shortlink service created with Node.js and MongoDB. Using this project, users can easily convert large links into small links and analyze them.
Created by **Mohammad Razavi**.

Technologies used:
- Node.js
- Express.js
- MongoDB
- NanoID
- Mongoose
- EJS
- Other

## Install dependencies
You need to install the following dependencies.
- express
- express-session
- cookie-parser
- nanoid
- connect-flash
- mongoose
- express-validator
- ejs
- bootstrap
- morgan
- winston
- auto-bind@**4.0.0**
- config

install :
‍‍`npm install`

## Run
Set environment variables:

1. Set PORT:
   Linux/Mac:
   `export PORT=[port]`
   Windows(CMD):
   `set PORT=[port]`
2. Set COOKIE_SECRET:
   Linux/Mac:
   `export COOKIE_SECRET=[cookie secret]`
   Windows(CMD):
   `set COOKIE_SECRET=[cookie secret]`
3. Set SESSION_SECRET:
   Linux/Mac:
   `export SESSION_SECRET=[session secret]`
   Windows(CMD):
   `set SESSION_SECRET=[session secret]`
4. Set DB_ADDRESS:
   Linux/Mac:
   `export DB_ADDRESS=[database address]`
   Windows(CMD):
   `set DB_ADDRESS=[database address]`
5. Set DOMAIN(example: http://localhost:port/):
   Linux/Mac:
   `export DOMAIN=[domain]`
   Windows(CMD):
   `set DOMAIN=[domain]`
6. Set run mode:
   Linux/Mac:
   - Development:
     `export NODE_ENV=development`
   - Production:
     `export NODE_ENV=production`
   Windows(CMD):
   - Development:
     `set NODE_ENV=development`
   - Production:
     `set NODE_ENV=production`

npm start:
`npm start`

## Development & Production 
By setting **NODE_ENV**, the program automatically configures the appropriate settings for the run type.

## MVC
**Shortlink** project uses MVC(Model/View/Controller) architecture.
**Models:** `./models`
**Views:** `./views`
**Controllers:** `./controllers`
**Public folder:** `./public`

## NanoID
**Shortlink** can convert big links into a small link with a 6-digit ID. This is done by the nanoid package.

## Mongoose @ MongoDB
Shortlink project uses Mongoose ODM. Connection with MongoDB is done with low security. You can view this link to increase security: 

https://www.mongodb.com/docs/manual/tutorial/manage-users-and-roles/
https://mongoosejs.com/docs/connections.html

## Description of the project

GET  - /         Create short link Page
GET  - /analyze  Analyze short links Page
GET  - /about    About page
GET  - /:id      Redirect
POST - /create   Create short link 
POST - /analyze  Analyze short links 

## Social Networks
Instagram: https://instagram.com/iammohraz
Github: https://github.com/iammohraz
