import { Router, RequestHandler } from 'express';
import { MarkController } from '../controllers/mark.controller';
import { validate } from '../middleware/validation.middleware';
import { markValidation } from '../types/validation';

const router = Router();

/**
 * @swagger
 * /api/marks:
 *   post:
 *     summary: Create a new mark
 *     tags: [Marks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - subjectId
 *               - score
 *               - semester
 *               - academicYear
 *             properties:
 *               studentId:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               subjectId:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174001
 *               score:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 example: 85.5
 *               semester:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 8
 *                 example: 1
 *               academicYear:
 *                 type: string
 *                 pattern: '^\\d{4}-\\d{4}$'
 *                 example: 2023-2024
 *     responses:
 *       201:
 *         description: Mark created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mark'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validate(markValidation.create), MarkController.create as RequestHandler);

/**
 * @swagger
 * /api/marks:
 *   get:
 *     summary: Get all marks with pagination
 *     tags: [Marks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of marks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.get('/', MarkController.getAll as RequestHandler);

/**
 * @swagger
 * /api/marks/student/{studentId}:
 *   get:
 *     summary: Get all marks for a student
 *     tags: [Marks]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of marks for the student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/student/:studentId', MarkController.getByStudentId as RequestHandler);

/**
 * @swagger
 * /api/marks/{id}:
 *   get:
 *     summary: Get a mark by ID
 *     tags: [Marks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Mark ID
 *     responses:
 *       200:
 *         description: Mark details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mark'
 *       404:
 *         description: Mark not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', MarkController.getById as RequestHandler);

/**
 * @swagger
 * /api/marks/{id}:
 *   put:
 *     summary: Update a mark
 *     tags: [Marks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Mark ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 example: 85.5
 *               semester:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 8
 *                 example: 1
 *               academicYear:
 *                 type: string
 *                 pattern: '^\\d{4}-\\d{4}$'
 *                 example: 2023-2024
 *     responses:
 *       200:
 *         description: Mark updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mark'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Mark not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', validate(markValidation.update), MarkController.update as RequestHandler);

/**
 * @swagger
 * /api/marks/{id}:
 *   delete:
 *     summary: Delete a mark
 *     tags: [Marks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Mark ID
 *     responses:
 *       204:
 *         description: Mark deleted successfully
 *       404:
 *         description: Mark not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', MarkController.delete as RequestHandler);

export default router; 