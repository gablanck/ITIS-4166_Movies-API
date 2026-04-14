const authService = require('../services/auth.service');

const signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = { signup, login };
