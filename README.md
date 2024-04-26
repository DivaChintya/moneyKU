# A Management App
Help you save your money by storing your history of transaction!

# Features
- User Registration:
Users can register into the app by providing a name and email.
When a new user registers, the app checks if the email has been used before.
- User Authentication:
Users can log into the app by providing their registered name and email.
Upon successful authentication, the app generates a JWT token which is used for authorisation in subsequent requests.
- Transaction Recording:
Users can add new transactions to the system by providing information such as name, status, category, amount, and transaction date.
The transaction data is stored in the database with respect to the user ID associated with the transaction.
- Retrieval of Transaction Data:
Users can retrieve all transactions associated with their account.
Transactions are displayed based on the user ID given in the JWT token.
- Transaction Update and Deletion:
Users can update existing transaction information, such as name, status, category, amount, and date.
Users can also delete transactions that are no longer needed.
- JWT Token Generation:
After a user successfully logs in, the application generates a JWT token that contains user information, such as ID, name, and email.
This JWT token is used to identify and authenticate the user in every request they submit.

# Architecture
This Money Management application follows an architecture consisting of several layers, including routing, business logic, and database access layers. This architecture makes it possible to separate responsibilities based on functionality, simplifying code development and maintenance.

# Technology
- Backend Framework: Express.js
  - Express.js is used as a framework to manage HTTP routes and requests, as well as providing middleware to handle authorisation, validation and more.
- Programming Language: Node.js
  - Node.js is used as a runtime to run JavaScript on the server side.
- Database ORM: Prisma
  - Prisma is used as an ORM (Object-Relational Mapping) for easy access and manipulation of data in the database. It helps in creating and executing database queries in a declarative manner using a defined data model.
- Authentication: JSON Web Tokens (JWT)
  - JWT is used to secure the communication between the client and server by encrypting sensitive data in tokens that can be verified by the server.



