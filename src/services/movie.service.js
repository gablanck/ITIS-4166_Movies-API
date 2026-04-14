const movieRepository = require('../repositories/movie.repository');

const create = async (body, userId) => {
  const { title, releaseYear, genre, description } = body;
  if (!title) throw { status: 400, message: 'title is required' };
  try {
    return await movieRepository.create({ title, releaseYear, genre, description, userId });
  } catch (e) {
    if (e.code === 'P2002') throw { status: 409, message: 'Movie already exists' };
    throw e;
  }
};

const getAll = async (filters) => {
  return movieRepository.findAll(filters);
};

const getById = async (id) => {
  const movie = await movieRepository.findById(id);
  if (!movie) throw { status: 404, message: 'Movie not found' };
  return movie;
};

const update = async (id, body, userId) => {
  const movie = await movieRepository.findById(id);
  if (!movie) throw { status: 404, message: 'Movie not found' };
  if (movie.userId !== userId) throw { status: 403, message: 'Forbidden' };
  try {
    return await movieRepository.update(id, body);
  } catch (e) {
    if (e.code === 'P2025') throw { status: 404, message: 'Movie not found' };
    throw e;
  }
};

const remove = async (id, userId) => {
  const movie = await movieRepository.findById(id);
  if (!movie) throw { status: 404, message: 'Movie not found' };
  if (movie.userId !== userId) throw { status: 403, message: 'Forbidden' };
  try {
    return await movieRepository.deleteById(id);
  } catch (e) {
    if (e.code === 'P2025') throw { status: 404, message: 'Movie not found' };
    throw e;
  }
};

module.exports = { create, getAll, getById, update, remove };
