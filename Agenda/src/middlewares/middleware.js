exports.middlewareGlobal = (req, res, next) => {
  res.locals.umaVariavelLocal = 'Este e o valor da variável local'
  next();
}

exports.outroMiddleware = (req, res, next) => {
  console.log('Sou seu outro Middleware')
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('./includes/404');
  }
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}