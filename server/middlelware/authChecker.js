const CustomError = require('../helper/customError');
const { jwtVerify } = require('../helper/jwtSign');

exports.authCheck = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.userData = undefined;
    next()
    return
  }

  jwtVerify(token)
    .then(decodedToken => {
      req.userData = decodedToken;
       next();
    })
    .catch(error => {
      next(new CustomError(401, 'Invalid token'));
    });
};
