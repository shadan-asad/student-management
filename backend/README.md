# Student Management System Backend

A RESTful API for managing student information, subjects, and marks using Node.js, Express.js, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `student_manager`

4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=student_manager
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about:
- Available endpoints
- Request/response schemas
- Example requests and responses
- Authentication requirements
- Error responses

## API Endpoints

### Students

- `POST /api/students` - Create a new student
  - Required fields: firstName, lastName, email, dateOfBirth, gender
- `GET /api/students` - Get all students (with pagination)
  - Query params: page (default: 1), limit (default: 10, max: 100)
- `GET /api/students/:id` - Get a single student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Subjects

- `POST /api/subjects` - Create a new subject
  - Required fields: name, code
- `GET /api/subjects` - Get all subjects (with pagination)
  - Query params: page (default: 1), limit (default: 10, max: 100)
- `GET /api/subjects/:id` - Get a single subject
- `PUT /api/subjects/:id` - Update a subject
- `DELETE /api/subjects/:id` - Delete a subject

### Marks

- `POST /api/marks` - Create a new mark
  - Required fields: studentId, subjectId, score, semester, academicYear
- `GET /api/marks` - Get all marks (with pagination)
  - Query params: page (default: 1), limit (default: 10, max: 100)
- `GET /api/marks/student/:studentId` - Get all marks for a student
- `GET /api/marks/:id` - Get a single mark
- `PUT /api/marks/:id` - Update a mark
- `DELETE /api/marks/:id` - Delete a mark

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter
- `npm run typeorm` - Run TypeORM CLI commands

## Database Schema

### Students Table
- id (UUID, Primary Key)
- firstName (VARCHAR)
- lastName (VARCHAR)
- email (VARCHAR, UNIQUE)
- dateOfBirth (DATE)
- gender (ENUM: MALE, FEMALE, OTHER)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Subjects Table
- id (UUID, Primary Key)
- name (VARCHAR)
- code (VARCHAR, UNIQUE)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Marks Table
- id (UUID, Primary Key)
- studentId (UUID, Foreign Key)
- subjectId (UUID, Foreign Key)
- score (DECIMAL)
- semester (INTEGER)
- academicYear (VARCHAR)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

## Features

- **Input Validation**: Using Zod for request validation
- **Type Safety**: Full TypeScript support
- **API Documentation**: Swagger/OpenAPI documentation
- **Pagination**: Built-in pagination for list endpoints
- **Error Handling**: Consistent error responses
- **Database**: TypeORM with PostgreSQL
- **Logging**: Request logging and error tracking
