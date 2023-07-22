# Ecommerce Project

This project is an ecommerce application built using the MERN stack (MongoDB, Express.js, React, and Node.js) with Vite as the build tool. It includes an Admin Dashboard with a custom CMS (Content Management System) and a frontend where customers can place orders.

<div align="center">
  <img src="https://assets.cdn.prod.twilio.com/images/lI7CV0Ljd8jXb6wL-YJevh0h0D2eItC8P9mJtHZ_JgdSzF.width-808.gif" alt="Banner">
</div>

## Project Dependencies

The project has the following dependencies:

- axios: ^1.4.0
- bcrypt: ^5.1.0
- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- jsonwebtoken: ^9.0.1
- mongodb: ^5.7.0
- mongoose: ^7.3.3
- multer: ^1.4.5-lts.1
- nodemon: ^3.0.1

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <https://github.com/MohammadToumouk/E-Commerce>
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-project
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the backend server and frontend development server concurrently.

5. Access the application:

   - The frontend can be accessed at: `http://localhost:3069`
   - The Admin Dashboard can be accessed at: `http://localhost:3069/admin`

## Project Structure

The project follows a typical MERN stack folder structure:

- `client/` - Contains the frontend React application.
- `server/` - Contains the backend Node.js application.
- `server/models/` - Contains the Mongoose models for interacting with the MongoDB database.
- `server/routes/` - Contains the API routes for handling different endpoints.
- `server/controllers/` - Contains the controllers for handling business logic.
- `server/middleware/` - Contains middleware functions used by the routes.
- `server/config/` - Contains configuration files, such as database connection setup and environment variables.
- `server/public/` - Contains static files served by the backend.
- `server/uploads/` - Stores uploaded files.
- `server/app.js` - Entry point for the backend application.
- `client/src/` - Contains the frontend source code.
- `client/src/components/` - Contains reusable React components.
- `client/src/pages/` - Contains different pages of the frontend application.
- `client/src/api/` - Contains utility functions for making API requests.

## Usage

Once the application is set up and running, you can access the frontend to browse and order products. The Admin Dashboard provides a CMS for managing products, orders, and other aspects of the ecommerce store.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. You can also open issues for bug reports or feature requests.
