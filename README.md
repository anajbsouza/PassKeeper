# PassKeeper - Password Manager

PassKeeper is a back-end application for managing website and app passwords, developed in Node. It operates via HTTP(s) requests following the REST convention.

# How does it work?

The API provides various endpoints for handling credentials and users:

## Credential Endpoints (/credentials)

**- POST /credentials**: Creates a new credential. Requires user token authentication and credential schema validation before creation.

**- GET /credentials**: Returns all credentials. Requires user token authentication.

**- GET /credentials/:id**: Returns a specific credential based on its ID. Requires user token authentication.

**- DELETE /credentials/:id**: Deletes a credential based on its ID. Requires user token authentication.

## User Endpoints (/users)

**- POST /register**: Registers a new user. Requires user schema validation before registration.

**- POST /login**: Logs in the user. Requires user schema validation before login.

# Motivation

This project was developed with the goal of practicing building a REST API using Node, Express, TypeScript, and Prisma. I also created automated integration tests using Jest and Supertest.

# Technologies Used

The following technologies were used for this project:

- Node (version 18.17.0)
- Express
- TypeScript
- Prisma
- Postgres
- Jest and Supertest
- Joi
- http-status
- Bcrypt
- Faker
- jsonwebtoken
- Nodemon


# Running the Project in Development

To run this project in development, follow these steps:

- Clone this repository.
- Install the necessary dependencies using the command: npm install.
- Create a .env file based on the .env.example.
- For running the tests, create another .env.test file based on the .env.example.
- In the .env file, insert the following properties:

```DATABASE_URL="postgresql://postgres..."```

- The DATABASE_URL property is used for database connection.
- Run Prisma to create the database and the required tables using the command: npx prisma migrate dev.
- To start the project in development mode, use the command: npm run dev.
- Manual tests can be performed using Thunder Client.
