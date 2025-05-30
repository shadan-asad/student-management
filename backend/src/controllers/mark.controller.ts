import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Mark } from '../entities/mark.entity';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const markRepository = AppDataSource.getRepository(Mark);

export class MarkController {
  // Create a new mark
  static async create(req: Request, res: Response) {
    try {
      const mark = markRepository.create(req.body);
      const result = await markRepository.save(mark);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error creating mark', error });
    }
  }

  // Get all marks with pagination
  static async getAll(req: Request, res: Response) {
    try {
      const { page, limit } = getPaginationParams(req.query);
      const [marks, total] = await markRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['student', 'subject'],
      });

      res.json(createPaginatedResponse(marks, total, { page, limit }));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching marks', error });
    }
  }

  // Get marks by student ID
  static async getByStudentId(req: Request, res: Response) {
    try {
      const { page, limit } = getPaginationParams(req.query);
      const [marks, total] = await markRepository.findAndCount({
        where: { student: { id: req.params.studentId } },
        skip: (page - 1) * limit,
        take: limit,
        relations: ['subject'],
      });

      res.json(createPaginatedResponse(marks, total, { page, limit }));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student marks', error });
    }
  }

  // Get a single mark by ID
  static async getById(req: Request, res: Response) {
    try {
      const mark = await markRepository.findOne({
        where: { id: req.params.id },
        relations: ['student', 'subject'],
      });

      if (!mark) {
        return res.status(404).json({ message: 'Mark not found' });
      }

      res.json(mark);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching mark', error });
    }
  }

  // Update a mark
  static async update(req: Request, res: Response) {
    try {
      const mark = await markRepository.findOne({
        where: { id: req.params.id },
      });

      if (!mark) {
        return res.status(404).json({ message: 'Mark not found' });
      }

      markRepository.merge(mark, req.body);
      const result = await markRepository.save(mark);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error updating mark', error });
    }
  }

  // Delete a mark
  static async delete(req: Request, res: Response) {
    try {
      const mark = await markRepository.findOne({
        where: { id: req.params.id },
      });

      if (!mark) {
        return res.status(404).json({ message: 'Mark not found' });
      }

      await markRepository.remove(mark);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting mark', error });
    }
  }
} 