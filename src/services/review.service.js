const reviewRepository = require('../repositories/review.repository');
const movieRepository = require('../repositories/movie.repository');

const create = async (body, userId) => {
  const { movieId, rating, body: reviewBody } = body;
  if (!movieId || rating === undefined) {
    throw { status: 400, message: 'movieId and rating are required' };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw { status: 400, message: 'rating must be an integer between 1 and 5' };
  }
  const movie = await movieRepository.findById(parseInt(movieId));
  if (!movie) throw { status: 404, message: 'Movie not found' };
  try {
    return await reviewRepository.create({
      userId,
      movieId: parseInt(movieId),
      rating,
      body: reviewBody,
    });
  } catch (e) {
    if (e.code === 'P2002') throw { status: 409, message: 'You have already reviewed this movie' };
    throw e;
  }
};

const getAll = async (userId, movieId) => {
  return reviewRepository.findAllByUser(userId, movieId);
};

const getById = async (id) => {
  const review = await reviewRepository.findById(id);
  if (!review) throw { status: 404, message: 'Review not found' };
  return {
    ...review,
    movieTitle: review.movie.title,
    username: review.user.username,
  };
};

const update = async (id, body, userId) => {
  const review = await reviewRepository.findById(id);
  if (!review) throw { status: 404, message: 'Review not found' };
  if (review.userId !== userId) throw { status: 403, message: 'Forbidden' };
  if (body.rating !== undefined) {
    if (!Number.isInteger(body.rating) || body.rating < 1 || body.rating > 5) {
      throw { status: 400, message: 'rating must be an integer between 1 and 5' };
    }
  }
  try {
    return await reviewRepository.update(id, body);
  } catch (e) {
    if (e.code === 'P2025') throw { status: 404, message: 'Review not found' };
    throw e;
  }
};

const remove = async (id, userId) => {
  const review = await reviewRepository.findById(id);
  if (!review) throw { status: 404, message: 'Review not found' };
  if (review.userId !== userId) throw { status: 403, message: 'Forbidden' };
  try {
    return await reviewRepository.deleteById(id);
  } catch (e) {
    if (e.code === 'P2025') throw { status: 404, message: 'Review not found' };
    throw e;
  }
};

module.exports = { create, getAll, getById, update, remove };
