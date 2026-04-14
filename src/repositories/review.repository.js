const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = (data) => {
  return prisma.review.create({ data });
};

const findAllByUser = (userId, movieId) => {
  const where = { userId };
  if (movieId) where.movieId = parseInt(movieId);
  return prisma.review.findMany({ where });
};

const findById = (id) => {
  return prisma.review.findUnique({
    where: { id },
    include: {
      movie: { select: { title: true } },
      user: { select: { username: true } },
    },
  });
};

const update = (id, data) => {
  return prisma.review.update({ where: { id }, data });
};

const deleteById = (id) => {
  return prisma.review.delete({ where: { id } });
};

module.exports = { create, findAllByUser, findById, update, deleteById };
