require('dotenv').config();

const corsOption = {
  origin: (origin, callback) => {
    process.env.WHITE_LIST.includes(origin)
      ? callback(null, true)
      : callback(new Error('Not allowed CORS.'));
  },
  optionsSuccessStatus: 200,
};

module.exports = { corsOption };