import { Router } from 'express';
import * as controller from '../controllers/word.controller';

const router = Router();

/**
 * @swagger
 * /api/words:
 *   get:
 *     summary: Get all words
 *     responses:
 *       200:
 *         description: A list of words.
 */
router.get('/words', controller.getAll);

/**
 * @swagger
 * /api/words/{word}:
 *   get:
 *     summary: Get a word entry
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word entry found
 *       404:
 *         description: Word not found
 */
router.get('/words/:word', controller.get);

/**
 * @swagger
 * /api/words:
 *   post:
 *     summary: Create a new word entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *               meanings:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Word created
 */
router.post('/words', controller.create);

/**
 * @swagger
 * /api/words/{word}:
 *   put:
 *     summary: Update meanings of a word
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meanings:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Word updated
 *       404:
 *         description: Word not found
 */
router.put('/words/:word', controller.update);

/**
 * @swagger
 * /api/words/{word}:
 *   delete:
 *     summary: Delete a word
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word deleted
 *       404:
 *         description: Word not found
 */
router.delete('/words/:word', controller.remove);

export default router;
