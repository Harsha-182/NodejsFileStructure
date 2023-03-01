const { body, query } = require('express-validator');
const { HTTP_ERROR_MESSAGES } = require('../../constants/messages');

const EMAIL_CHECK = body('email')
  .exists()
  .withMessage(HTTP_ERROR_MESSAGES.EMAIL_REQUIRED)
  .bail()
  .escape()
  .normalizeEmail()
  .isEmail()
  .withMessage(HTTP_ERROR_MESSAGES.EMAIL_INVALID);

const CREDENTIALS = [
  EMAIL_CHECK,
  body('password')
    .exists()
    .withMessage(HTTP_ERROR_MESSAGES.PASSWORD_REQUIRED)
    .not()
    .isEmpty()
    .withMessage(HTTP_ERROR_MESSAGES.PASSWORD_REQUIRED),
];

module.exports = {
  CREDENTIALS,
};
