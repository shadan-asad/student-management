# Student Manager

A full-stack web application for managing students, subjects, and their academic marks. Built with Node.js, Express, TypeScript, React, and PostgreSQL.

Deployed URL: https://student-management-puce.vercel.app/

## Features

### Student Management
- Create, read, update, and delete student records
- View student details including personal information
- Manage student marks across different subjects

### Subject Management
- Create, read, update, and delete subject records
- View subject details and codes
- Associate subjects with student marks

### Mark Management
- Record and manage student marks for each subject
- Track marks by semester and academic year
- View comprehensive mark history for each student

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Winston Logger
- Zod for validation
- Swagger/OpenAPI documentation

### Frontend
- React
- TypeScript
- React Router
- React Bootstrap
- Formik & Yup
- Axios
- SweetAlert2

## Prerequisites

Before running the project, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

## Project Structure

```
student-manager/
├── backend/           # Backend API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── entities/
│   │   ├── migrations/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
└── frontend/          # React frontend application
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.tsx
    │   │   │   ├── LoadingSpinner.tsx
    │   │   │   └── ErrorMessage.tsx
    │   │   ├── students/
    │   │   │   ├── StudentList.tsx
    │   │   │   └── StudentForm.tsx
    │   │   ├── subjects/
    │   │   │   ├── SubjectList.tsx
    │   │   │   └── SubjectForm.tsx
    │   │   └── marks/
    │   │       ├── MarkList.tsx
    │   │       └── MarkForm.tsx
    │   ├── services/
    │   │   ├── api.ts
    │   │   ├── studentService.ts
    │   │   ├── subjectService.ts
    │   │   └── markService.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   └── main.tsx
```

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

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shadan-asad/student-management
   cd student-management
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

3. Configure the database:
   - Create a PostgreSQL database named `student_manager`
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=3000
     NODE_ENV=development
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=postgres
     DB_PASSWORD=postgres
     DB_NAME=student_manager
     ```

4. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

5. Configure frontend environment:
   - Create a `.env` file in the frontend directory
   - Set the API base URL: `VITE_API_URL=http://localhost:3000/api`

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will start on http://localhost:3000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend application will start on http://localhost:5173

3. Access the application:
   - Open your browser and navigate to http://localhost:5173
   - The API documentation is available at http://localhost:3000/api-docs

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

### Backend Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter
- `npm run typeorm` - Run TypeORM CLI commands

### Frontend Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## Features

### Backend Features
- Input Validation using Zod
- Full TypeScript support
- API Documentation with Swagger/OpenAPI
- Built-in pagination for list endpoints
- Consistent error responses
- TypeORM with PostgreSQL
- Request logging and error tracking

### Frontend Features
- Responsive design with Bootstrap
- Form validation with Formik and Yup
- User feedback with SweetAlert2
- Pagination for list views
- Type-safe API integration
- Modern React practices with hooks

## License

This project is licensed under the MIT License - see the LICENSE file for details. 