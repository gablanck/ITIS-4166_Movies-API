const watchlistService = require('../services/watchlist.service');

const createWatchlist = async (req, res, next) => {
  try {
    const watchlist = await watchlistService.create(req.body, req.user.id);
    res.status(201).json(watchlist);
  } catch (e) {
    next(e);
  }
};

const getAllWatchlists = async (req, res, next) => {
  try {
    const watchlists = await watchlistService.getAll(req.user.id);
    res.status(200).json(watchlists);
  } catch (e) {
    next(e);
  }
};

const getWatchlistById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const watchlist = await watchlistService.getById(id, req.user.id);
    res.status(200).json(watchlist);
  } catch (e) {
    next(e);
  }
};

const updateWatchlist = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const watchlist = await watchlistService.update(id, req.body, req.user.id);
    res.status(200).json(watchlist);
  } catch (e) {
    next(e);
  }
};

const deleteWatchlist = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const watchlist = await watchlistService.remove(id, req.user.id);
    res.status(200).json(watchlist);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createWatchlist,
  getAllWatchlists,
  getWatchlistById,
  updateWatchlist,
  deleteWatchlist,
};
