const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const {
  createWatchlist,
  getAllWatchlists,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
} = require('../controllers/watchlists.controller');

/**
 * @openapi
 * tags:
 *   name: Watchlists
 *   description: Watchlist management
 */

/**
 * @openapi
 * /api/watchlists:
 *   post:
 *     summary: Create a new watchlist
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Watchlist created
 *       400:
 *         description: name is required
 *       401:
 *         description: Missing or invalid token
 */
router.post('/', authenticateToken, createWatchlist);

/**
 * @openapi
 * /api/watchlists:
 *   get:
 *     summary: Get all watchlists for the current user
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the current user's watchlists
 *       401:
 *         description: Missing or invalid token
 */
router.get('/', authenticateToken, getAllWatchlists);

/**
 * @openapi
 * /api/watchlists/{id}:
 *   get:
 *     summary: Get a watchlist by ID (owner or public)
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Watchlist ID
 *     responses:
 *       200:
 *         description: Watchlist object with movies
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Watchlist is private and you are not the owner
 *       404:
 *         description: Watchlist not found
 */
router.get('/:id', authenticateToken, getWatchlistById);

/**
 * @openapi
 * /api/watchlists/{id}:
 *   put:
 *     summary: Update a watchlist (owner only)
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Watchlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated watchlist object
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Not the owner
 *       404:
 *         description: Watchlist not found
 */
router.put('/:id', authenticateToken, updateWatchlist);

/**
 * @openapi
 * /api/watchlists/{id}:
 *   delete:
 *     summary: Delete a watchlist (owner only)
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Watchlist ID
 *     responses:
 *       200:
 *         description: Deleted watchlist object
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Not the owner
 *       404:
 *         description: Watchlist not found
 */
router.delete('/:id', authenticateToken, deleteWatchlist);

module.exports = router;
