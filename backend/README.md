# Student Management System Backend

A RESTful API for managing student information and marks using Node.js, Express.js, TypeScript, and PostgreSQL.

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

## API Endpoints

### Students

- `POST /api/students` - Create a new student
- `GET /api/students` - Get all students (with pagination)
- `GET /api/students/:id` - Get a single student with marks
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter

## Database Schema

### Students Table
- id (UUID, Primary Key)
- first_name (VARCHAR)
- last_name (VARCHAR)
- email (VARCHAR, UNIQUE)
- date_of_birth (DATE)
- gender (ENUM)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Subjects Table
- id (UUID, Primary Key)
- name (VARCHAR)
- code (VARCHAR, UNIQUE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Marks Table
- id (UUID, Primary Key)
- student_id (UUID, Foreign Key)
- subject_id (UUID, Foreign Key)
- score (DECIMAL)
- semester (INTEGER)
- academic_year (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP) 