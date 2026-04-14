const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/reviews.controller');

/**
 * @openapi
 * tags:
 *   name: Reviews
 *   description: Movie review management
 */

/**
 * @openapi
 * /api/reviews:
 *   post:
 *     summary: Create a review for a movie
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - rating
 *             properties:
 *               movieId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Missing required fields or rating out of range
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Movie not found
 *       409:
 *         description: You have already reviewed this movie
 */
router.post('/', authenticateToken, createReview);

/**
 * @openapi
 * /api/reviews:
 *   get:
 *     summary: Get all reviews by the current user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: movie_id
 *         schema:
 *           type: integer
 *         description: Filter reviews by movie ID
 *     responses:
 *       200:
 *         description: List of the current user's reviews
 *       401:
 *         description: Missing or invalid token
 */
router.get('/', authenticateToken, getAllReviews);

/**
 * @openapi
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID (includes movieTitle and username)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review object with movieTitle and username
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Review not found
 */
router.get('/:id', authenticateToken, getReviewById);

/**
 * @openapi
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review (owner only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated review object
 *       400:
 *         description: Invalid ID or rating out of range
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Not the owner
 *       404:
 *         description: Review not found
 */
router.put('/:id', authenticateToken, updateReview);

/**
 * @openapi
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review (owner only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Deleted review object
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Not the owner
 *       404:
 *         description: Review not found
 */
router.delete('/:id', authenticateToken, deleteReview);

module.exports = router;
