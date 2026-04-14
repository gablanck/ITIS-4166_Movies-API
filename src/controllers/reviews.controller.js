const reviewService = require('../services/review.service');

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.create(req.body, req.user.id);
    res.status(201).json(review);
  } catch (e) {
    next(e);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAll(req.user.id, req.query.movie_id);
    res.status(200).json(reviews);
  } catch (e) {
    next(e);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const review = await reviewService.getById(id);
    res.status(200).json(review);
  } catch (e) {
    next(e);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const review = await reviewService.update(id, req.body, req.user.id);
    res.status(200).json(review);
  } catch (e) {
    next(e);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const review = await reviewService.remove(id, req.user.id);
    res.status(200).json(review);
  } catch (e) {
    next(e);
  }
};

module.exports = { createReview, getAllReviews, getReviewById, updateReview, deleteReview };
