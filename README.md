# Storefront Backend

## Description

## Requirements
Ensure that you have [docker](https://www.docker.com/get-started/) & [docker-compose](https://docs.docker.com/compose/install) installed, as well as [db-migrate](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/installation/) installed globally
## Technologies
- Postgres 
- Node/Express
- Typescript
- dotenv
- db-migrate
- jsonwebtoken
- jasmine


## Getting Started

1. First, install the dependencies
``` yarn install ```
2. With docker running on your machine, set up a postgres container and run the database migration files using the command ```yarn db:start```

3. Start up the server via ``` yarn watch ```


## Testing
``` yarn test ```
<br>
This command creates the test database and executes jasmine command to run the tests


