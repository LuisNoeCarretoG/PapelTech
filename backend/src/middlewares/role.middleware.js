const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ ok: false, message: 'No autorizado para esta accion' });
    }
    next();
  };
};

module.exports = { allowRoles };
