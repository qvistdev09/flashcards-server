const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
});

const authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  const aud = 'api://default';

  if (!match) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    return next(error);
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken, aud)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      err.statusCode = 401;
      next(err);
    });
};

module.exports = { authRequired };
