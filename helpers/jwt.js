const { expressjwt } = require('express-jwt');
require('dotenv').config();

function authJwt() {
  return expressjwt({
    secret: process.env.SECRET_TOKEN,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
      `/user/login`,
      `/user/register`,
    ],
  });
}

async function isRevoked(req, token) {
  if (token.payload.isAdmin) return false;
  else return true;
  // payload.isAdmin ? done() : done(null, true);
}

module.exports = { authJwt };
