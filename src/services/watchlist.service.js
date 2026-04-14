const watchlistRepository = require('../repositories/watchlist.repository');

const create = async (body, userId) => {
  const { name, description, isPublic } = body;
  if (!name) throw { status: 400, message: 'name is required' };
  return watchlistRepository.create({ name, description, isPublic, userId });
};

const getAll = async (userId) => {
  return watchlistRepository.findAllByUser(userId);
};

const getById = async (id, userId) => {
  const watchlist = await watchlistRepository.findById(id);
  if (!watchlist) throw { status: 404, message: 'Watchlist not found' };
  if (watchlist.userId !== userId && !watchlist.isPublic) {
    throw { status: 403, message: 'Forbidden' };
  }
  return watchlist;
};

const update = async (id, body, userId) => {
  const watchlist = await watchlistRepository.findById(id);
  if (!watchlist) throw { status: 404, message: 'Watchlist not found' };
  if (watchlist.userId !== userId) throw { status: 403, message: 'Forbidden' };
  try {
    return await watchlistRepository.update(id, body);
  } catch (e) {
    if (e.code === 'P2025') throw { status: 404, message: 'Watchlist not found' };
    throw e;
  }
};

const remove = async (id, userId) => {
  const watchlist = await watchlistRepository.findById(id);
  if (!watchlist) throw { status: 404, message: 'Watchlist not found' };
  if (watchlist.userId !== userId) throw { status: 403, message: 'Forbidden' };
  try {
    return await watchlistRepository.deleteById(id);
  } catch (e) {
    if (e.code === 'P2025') throw { status: 404, message: 'Watchlist not found' };
    throw e;
  }
};

module.exports = { create, getAll, getById, update, remove };
