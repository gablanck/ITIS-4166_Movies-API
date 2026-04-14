const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findByEmail = (email) => prisma.user.findUnique({ where: { email } });

const findByUsername = (username) => prisma.user.findUnique({ where: { username } });

const create = ({ username, email, passwordHash }) =>
  prisma.user.create({ data: { username, email, passwordHash } });

module.exports = { findByEmail, findByUsername, create };
