import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Subject } from '../entities/subject.entity';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const subjectRepository = AppDataSource.getRepository(Subject);

export class SubjectController {
  // Create a new subject
  static async create(req: Request, res: Response) {
    try {
      const subject = subjectRepository.create(req.body);
      const result = await subjectRepository.save(subject);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error creating subject', error });
    }
  }

  // Get all subjects with pagination
  static async getAll(req: Request, res: Response) {
    try {
      const { page, limit } = getPaginationParams(req.query);
      const [subjects, total] = await subjectRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['marks'],
      });

      res.json(createPaginatedResponse(subjects, total, { page, limit }));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching subjects', error });
    }
  }

  // Get a single subject by ID
  static async getById(req: Request, res: Response) {
    try {
      const subject = await subjectRepository.findOne({
        where: { id: req.params.id },
        relations: ['marks'],
      });

      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }

      res.json(subject);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching subject', error });
    }
  }

  // Update a subject
  static async update(req: Request, res: Response) {
    try {
      const subject = await subjectRepository.findOne({
        where: { id: req.params.id },
      });

      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }

      subjectRepository.merge(subject, req.body);
      const result = await subjectRepository.save(subject);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error updating subject', error });
    }
  }

  // Delete a subject
  static async delete(req: Request, res: Response) {
    try {
      const subject = await subjectRepository.findOne({
        where: { id: req.params.id },
      });

      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }

      await subjectRepository.remove(subject);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting subject', error });
    }
  }
} 