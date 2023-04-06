const { default: mongoose } = require('mongoose');
const Card = require('../models/cards');
const {
  cardValidationError,
  cardFindError,
  cardLikeError,
  cardIdError,
  cardDeleteError,
} = require('../errors/badCardResponces');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(cardValidationError));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => {
      throw new NotFoundError(cardFindError);
    })
    .then((card) => {
      if (req.user._id !== card.owner.valueOf()) {
        throw new ForbiddenError(cardDeleteError);
      }
      return Card.deleteOne(card)
        .then(() => {
          res.status(200).send({ message: 'пост удалён' });
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(cardIdError));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('likes')
    .then((card) => {
      if (card == null) {
        throw new NotFoundError(cardFindError);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(cardLikeError));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card == null) {
        throw new NotFoundError(cardFindError);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(cardLikeError));
      } else {
        next(err);
      }
    });
};
