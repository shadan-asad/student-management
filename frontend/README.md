# Student Manager Frontend

A React-based frontend application for managing students, subjects, and marks. Built with React, TypeScript, Bootstrap, and Formik.

## Features

- Student management (CRUD operations)
- Subject management (CRUD operations)
- Mark management for students
- Responsive design with Bootstrap
- Form validation with Formik and Yup
- User feedback with SweetAlert2
- Pagination for list views

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── students/
│   │   ├── StudentList.tsx
│   │   └── StudentForm.tsx
│   ├── subjects/
│   │   ├── SubjectList.tsx
│   │   └── SubjectForm.tsx
│   └── marks/
│       ├── MarkList.tsx
│       └── MarkForm.tsx
├── services/
│   ├── api.ts
│   ├── studentService.ts
│   ├── subjectService.ts
│   └── markService.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Dependencies

- React
- React Router DOM
- Bootstrap
- React Bootstrap
- Formik
- Yup
- Axios
- SweetAlert2

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## API Integration

The frontend integrates with the Student Manager Backend API. Make sure the backend server is running on `http://localhost:3000` before starting the frontend application.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
