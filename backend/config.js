require('dotenv').config();
// eslint-disable-next-line no-useless-escape
const { PATTERN = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/ } = process.env;
// const { JWT_SECRET = 'secret_code' } = process.env;
const { PORT = '3000' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  // JWT_SECRET,
  PORT,
  DB_ADDRESS,
  PATTERN,
};
