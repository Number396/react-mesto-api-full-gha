const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { PATTERN } = require('../config');
const {
  getUsers,
  getUserById,
  updateUser,
  updataAvatar,
} = require('../controllers/users');

const { auth } = require('../middlewares/auth');

router.get('/', auth, getUsers);

router.get('/me', auth, getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(PATTERN),
  }),
}), auth, updataAvatar);
module.exports = router;
