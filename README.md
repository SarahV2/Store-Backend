# Storefront Backend

## Description
Storefront Backend is an api that enables authenticating users, creating products and retreving their info, as well as creating and listing orders

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

## Database / API Requirements
Database models and info on the avaliable API endpoints can be found in the [Requirements document](https://github.com/SarahV2/Store-Backend/blob/main/REQUIREMENTS.md)
## Getting Started

### Preparing .env File and Installing the Dependencies
* a sample file is provided for environment variables, rename ```example.env``` to ```.env```

* then, install the dependencies by running ``` yarn install ```

### Setting up the Database
With docker running on your machine, set up a postgres container and run the database migration files using the command ```yarn db:start``` this will start the development database on port ```5432```

What this script will do behind the scenes:
- Run a docker container that uses a **postgres** image, and creates the default database based on the **ENV** value set in the ```.env``` file (it's set to **dev** as the default value)

- Run the DB migration files using **db-migrate**: ```db-migrate --env dev up```

3. Start up the server via ``` yarn watch ```. The server will start listening on port ```3000```

**Note:** a [postman collection](https://github.com/SarahV2/Store-Backend/blob/main/My%20Store.postman_collection.json) is provided if you wish to try out the endpoints in development

## Testing
``` yarn test ```
<br>
This command creates the test database and executes jasmine command to run the tests


