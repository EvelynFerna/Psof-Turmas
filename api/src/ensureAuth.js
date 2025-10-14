function ensureAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Usuário não autenticado' });
}

module.exports = ensureAuth;
