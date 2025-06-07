## API Service from Mini Notion Clone
Okay , This is Backend Service Project API to created Mini Notion-Clone Website

## Build With
- [TypeScript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale
- [Node JS](https://nodejs.org/en) - Node.js® is an open-source, cross-platform JavaScript runtime environment.
- [Socket.IO](https://socket.io/) - Scalable. Scale to multiple servers and send events to all connected clients with ease.
- [Express JS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Prisma](https://www.prisma.io/) - Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.
- [ESLint](https://eslint.org) - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.
- [Jest](https://jestjs.io) - Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase
- [JsonWebToken](https://jwt.io/) - is a compact URL-safe means of representing claims to be transferred between two parties.
- [Supertest](https://www.npmjs.com/package/supertest) - The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.


## FYI 
- For this project we are used prisma and Express Js structure to combination build REST + MVC API sercvice
- First i set the configuration for eslint to be good structure in my program
- Dont forget to build structure to be good
- And then i testing my controller to unit testing and api to be integration testing for this
- I get the coverage to see the presentace for good or not , i launch my testing
  
## Getting Started

if you need to start api from your local and you want to change more algorithm from this, u can cloning first:

```sh
$ git clone https://github.com/MuhammadAliffandy/mini-notion.git
$ cd backend
```

## Usage

before you run this you must installation package to make the program its not error for u.

```sh
$ npm install
```
run the server with Node JS runtime and i am used Node JS v 18+

NB : Before you start the apps you should addded confguration to .env

```javascript

DATABASE_URL_TEST="DATABASE URL FOR TESTING"
DATABASE_URL="DATABASE URL FOR DEVELOPMENT "
ACCESS_TOKEN_SECRET="ACCESS TOKEN TO NODE MAILER CONFIG"
NODE_ENV="dev || test"

```
After this you can started the apps

```sh
$ npm run dev
```
To check the documentation of API you can access url form your web machine 

```javascript
http://localhost:5000/api-documentation
```





