module.exports = (req, res, next) => {
  if (req.session.fullPermission === false)
    return res.render(`error_permission`, {layout: false});

  next();
}
