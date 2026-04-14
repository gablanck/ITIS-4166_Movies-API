const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = (data) => {
  return prisma.movie.create({ data });
};

const findAll = (filters = {}) => {
  const where = {};
  if (filters.genre) {
    where.genre = { equals: filters.genre, mode: 'insensitive' };
  }
  if (filters.year) {
    where.releaseYear = parseInt(filters.year);
  }
  if (filters.search) {
    where.title = { contains: filters.search, mode: 'insensitive' };
  }
  return prisma.movie.findMany({ where });
};

const findById = (id) => {
  return prisma.movie.findUnique({
    where: { id },
    include: { reviews: true },
  });
};

const update = (id, data) => {
  return prisma.movie.update({ where: { id }, data });
};

const deleteById = (id) => {
  return prisma.movie.delete({ where: { id } });
};

module.exports = { create, findAll, findById, update, deleteById };
