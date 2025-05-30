import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management System API',
      version: '1.0.0',
      description: 'API documentation for the Student Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Student: {
          type: 'object',
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000'
            },
            firstName: { 
              type: 'string',
              example: 'John'
            },
            lastName: { 
              type: 'string',
              example: 'Doe'
            },
            email: { 
              type: 'string', 
              format: 'email',
              example: 'john.doe@example.com'
            },
            dateOfBirth: { 
              type: 'string', 
              format: 'date',
              example: '2000-01-01'
            },
            gender: { 
              type: 'string', 
              enum: ['MALE', 'FEMALE', 'OTHER'],
              example: 'MALE'
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-03-14T10:30:00Z'
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-03-14T10:30:00Z'
            }
          },
          required: ['firstName', 'lastName', 'email', 'dateOfBirth', 'gender']
        },
        Subject: {
          type: 'object',
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174001'
            },
            name: { 
              type: 'string',
              example: 'Mathematics'
            },
            code: { 
              type: 'string',
              example: 'MATH101'
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-03-14T10:30:00Z'
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-03-14T10:30:00Z'
            }
          },
          required: ['name', 'code']
        },
        Mark: {
          type: 'object',
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174002'
            },
            studentId: { 
              type: 'string', 
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000'
            },
            subjectId: { 
              type: 'string', 
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174001'
            },
            score: { 
              type: 'number', 
              minimum: 0,
              maximum: 100,
              example: 85.5
            },
            semester: { 
              type: 'integer',
              minimum: 1,
              maximum: 8,
              example: 1
            },
            academicYear: { 
              type: 'string',
              pattern: '^\\d{4}-\\d{4}$',
              example: '2023-2024'
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-03-14T10:30:00Z'
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time',
              example: '2024-03-14T10:30:00Z'
            }
          },
          required: ['studentId', 'subjectId', 'score', 'semester', 'academicYear']
        },
        Error: {
          type: 'object',
          properties: {
            status: { 
              type: 'string',
              example: 'error'
            },
            message: { 
              type: 'string',
              example: 'Invalid input data'
            },
            errors: { 
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' }
                }
              },
              example: [
                {
                  field: 'email',
                  message: 'Invalid email format'
                }
              ]
            }
          }
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: { 
              type: 'array',
              items: { 
                type: 'object'
              }
            },
            meta: {
              type: 'object',
              properties: {
                total: { 
                  type: 'integer',
                  example: 100
                },
                page: { 
                  type: 'integer',
                  example: 1
                },
                limit: { 
                  type: 'integer',
                  example: 10
                },
                totalPages: { 
                  type: 'integer',
                  example: 10
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options); 