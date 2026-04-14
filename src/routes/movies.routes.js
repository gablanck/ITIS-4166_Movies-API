const { Router } = require('express');
const router = Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies.controller');

/**
 * @openapi
 * tags:
 *   name: Movies
 *   description: Movie management
 */

/**
 * @openapi
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               releaseYear:
 *                 type: integer
 *                 example: 2010
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               description:
 *                 type: string
 *                 example: A thief who steals corporate secrets through dream-sharing technology.
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 releaseYear:
 *                   type: integer
 *                 genre:
 *                   type: string
 *                 description:
 *                   type: string
 *                 userId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: title is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: title is required
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No token provided
 */
router.post('/', authenticateToken, createMovie);

/**
 * @openapi
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre (case-insensitive)
 *         example: Sci-Fi
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by release year
 *         example: 2010
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title (case-insensitive, partial match)
 *         example: Inception
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   releaseYear:
 *                     type: integer
 *                   genre:
 *                     type: string
 *                   userId:
 *                     type: integer
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No token provided
 */
router.get('/', authenticateToken, getAllMovies);

/**
 * @openapi
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID (includes reviews)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Movie object with reviews array
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 releaseYear:
 *                   type: integer
 *                 genre:
 *                   type: string
 *                 userId:
 *                   type: integer
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: ID must be a positive integer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID must be a positive integer
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No token provided
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Movie not found
 */
router.get('/:id', authenticateToken, getMovieById);

/**
 * @openapi
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie (owner only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               releaseYear:
 *                 type: integer
 *                 example: 2010
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Updated movie object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 releaseYear:
 *                   type: integer
 *                 genre:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: ID must be a positive integer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID must be a positive integer
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No token provided
 *       403:
 *         description: Not the owner of this movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Movie not found
 */
router.put('/:id', authenticateToken, updateMovie);

/**
 * @openapi
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie (owner only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Deleted movie object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 releaseYear:
 *                   type: integer
 *                 genre:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: ID must be a positive integer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID must be a positive integer
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No token provided
 *       403:
 *         description: Not the owner of this movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Movie not found
 */
router.delete('/:id', authenticateToken, deleteMovie);

module.exports = router;
