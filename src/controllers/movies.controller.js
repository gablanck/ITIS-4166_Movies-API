const movieService = require('../services/movie.service');

const createMovie = async (req, res, next) => {
  try {
    const movie = await movieService.create(req.body, req.user.id);
    res.status(201).json(movie);
  } catch (e) {
    next(e);
  }
};

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getAll(req.query);
    res.status(200).json(movies);
  } catch (e) {
    next(e);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const movie = await movieService.getById(id);
    res.status(200).json(movie);
  } catch (e) {
    next(e);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const movie = await movieService.update(id, req.body, req.user.id);
    res.status(200).json(movie);
  } catch (e) {
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!id || id < 1) return res.status(400).json({ error: 'ID must be a positive integer' });
    const movie = await movieService.remove(id, req.user.id);
    res.status(200).json(movie);
  } catch (e) {
    next(e);
  }
};

module.exports = { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie };
