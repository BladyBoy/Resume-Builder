The Resume Builder project is a comprehensive web-based application designed to facilitate the creation, management, and display of professional resumes. This project provides a user-friendly platform where individuals can input their personal and professional information to generate a well-structured resume. The application leverages modern web technologies to deliver a robust solution for resume management.

Users can create, edit and manage the resumes. They can also generate multiple templates provided for the resume. The application is securely handles the user athentication and stores the user data in a postgreSQL database and ensure every passwords are secured by hashing. Additionally, the application prevents the duplicate email registration during the signup process. And also the user can download the final generated resume into pdf format.

TECHNOLOGIES USED:
1. Frontend:

  EJS (Embedded JavaScript) : for server side rendering html pages
  CSS : for stying interface

2. Backend:

  nodeJS: for the server side coding
  expressJS: for handling HTTP requests and middlewares and routes
  passportJS: Middleware for handling authentication
  Sequelize ORM: for database operations with PostgreSQL

3. DataBase:

  PostgreSQL: Relational DB for storing user data and resumes
