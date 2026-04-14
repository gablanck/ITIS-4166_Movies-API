const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = (data) => {
  return prisma.watchlist.create({ data });
};

const findAllByUser = (userId) => {
  return prisma.watchlist.findMany({ where: { userId } });
};

const findById = (id) => {
  return prisma.watchlist.findUnique({
    where: { id },
    include: {
      movies: {
        include: { movie: true },
      },
    },
  });
};

const update = (id, data) => {
  return prisma.watchlist.update({ where: { id }, data });
};

const deleteById = (id) => {
  return prisma.watchlist.delete({ where: { id } });
};

module.exports = { create, findAllByUser, findById, update, deleteById };
