import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Student } from '../entities/student.entity';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const studentRepository = AppDataSource.getRepository(Student);

export class StudentController {
  // Create a new student
  static async create(req: Request, res: Response) {
    try {
      const student = studentRepository.create(req.body);
      const result = await studentRepository.save(student);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error creating student', error });
    }
  }

  // Get all students with pagination
  static async getAll(req: Request, res: Response) {
    try {
      const { page, limit } = getPaginationParams(req.query);
      const [students, total] = await studentRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['marks'],
      });

      res.json(createPaginatedResponse(students, total, { page, limit }));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  }

  // Get a single student by ID
  static async getById(req: Request, res: Response) {
    try {
      const student = await studentRepository.findOne({
        where: { id: req.params.id },
        relations: ['marks'],
      });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student', error });
    }
  }

  // Update a student
  static async update(req: Request, res: Response) {
    try {
      const student = await studentRepository.findOne({
        where: { id: req.params.id },
      });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      studentRepository.merge(student, req.body);
      const result = await studentRepository.save(student);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error updating student', error });
    }
  }

  // Delete a student
  static async delete(req: Request, res: Response) {
    try {
      const student = await studentRepository.findOne({
        where: { id: req.params.id },
      });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      await studentRepository.remove(student);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student', error });
    }
  }
} 