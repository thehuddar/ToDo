# Task Management Backend

This repository contains the backend code for Task Management, a web application built using Express.js and MongoDB to facilitate task tracking and management. The backend implements various features including password encryption, authentication, and authorization to ensure data security and user privacy.

## Technologies Used

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database used for storing task data.
- **bcryptjs**: Library for password hashing and encryption.
- **jsonwebtoken**: JSON Web Token implementation for user authentication.
- **express-validator**: Middleware for request validation in Express.js applications.
- **cors**: Express middleware for enabling Cross-Origin Resource Sharing (CORS).
- **nodemailer**: Module for sending emails, used for email verification and notifications.
- **mongoose**: Elegant MongoDB object modeling for Node.js, used for schema creation and data manipulation.
- **dotenv**: Module for loading environment variables from a .env file into process.env.

## Features

- **Password Encryption**: Utilizes bcryptjs for secure password hashing and encryption, ensuring user credentials are stored safely.
- **Authentication**: Implements JSON Web Tokens (JWT) for user authentication, allowing secure access to protected routes.
- **Authorization**: Validates user permissions and authorizes access to specific routes and resources.
- **Data Storage**: Utilizes MongoDB with mongoose for schema creation and data manipulation, enabling efficient retrieval and manipulation of tasks.
- **Email Verification**: Integrates nodemailer for sending verification emails to users, enhancing account security.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/surajagrawal01/TaskManagement-Backend.git

2. Install Dependencies
   ```bash
   cd TaskManagement-Backend
   npm install

3. Start the server
   ```bash
    node server.js

## Usage
The backend provides RESTful APIs for managing tasks. You can use tools like Postman or curl to interact with the APIs.

Authentication: Register and login endpoints are available for user authentication.
Task Management: Endpoints for creating, retrieving, updating, and deleting tasks are provided.

## Contributing
Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or feature requests.
