const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

const signup = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw { status: 400, message: 'username, email, and password are required' };
  }

  const [existingEmail, existingUsername] = await Promise.all([
    userRepository.findByEmail(email),
    userRepository.findByUsername(username),
  ]);

  if (existingEmail) throw { status: 409, message: 'Email already in use' };
  if (existingUsername) throw { status: 409, message: 'Username already taken' };

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepository.create({ username, email, passwordHash });

  const { passwordHash: _, ...userWithout } = user;
  return userWithout;
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: 'email and password are required' };
  }

  const user = await userRepository.findByEmail(email);
  if (!user) throw { status: 401, message: 'Invalid credentials' };

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw { status: 401, message: 'Invalid credentials' };

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const { passwordHash: _, ...userWithout } = user;
  return { token, user: userWithout };
};

module.exports = { signup, login };
