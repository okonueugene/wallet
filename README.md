[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Api Calls

transaction:
POST /users/:userId/wallets/:waletId/transactions //add transactions
GET  /users/:userId/wallets/:waletId/transactions/:id //get transaction

user:
POST /users   //add user
GET /users/:id  //user profile


wallet: 
POST /users/:userId/wallets/  //add wallet
GET /users/:userId/wallets/:id
