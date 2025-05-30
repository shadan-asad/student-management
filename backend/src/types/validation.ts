import { z } from 'zod';
import { Gender } from '../entities/student.entity';

const baseStudentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().transform((str) => new Date(str)),
  gender: z.nativeEnum(Gender),
});

const baseSubjectSchema = z.object({
  name: z.string().min(2, 'Subject name must be at least 2 characters'),
  code: z.string().min(2, 'Subject code must be at least 2 characters'),
});

const baseMarkSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  subjectId: z.string().uuid('Invalid subject ID'),
  score: z.number().min(0).max(100),
  semester: z.number().int().min(1).max(8),
  academicYear: z.string().regex(/^\d{4}-\d{4}$/, 'Academic year must be in format YYYY-YYYY'),
});

export const studentValidation = {
  create: baseStudentSchema,
  update: baseStudentSchema.partial(),
};

export const subjectValidation = {
  create: baseSubjectSchema,
  update: baseSubjectSchema.partial(),
};

export const markValidation = {
  create: baseMarkSchema,
  update: baseMarkSchema.partial(),
};

export type StudentInput = z.infer<typeof baseStudentSchema>;
export type SubjectInput = z.infer<typeof baseSubjectSchema>;
export type MarkInput = z.infer<typeof baseMarkSchema>; 