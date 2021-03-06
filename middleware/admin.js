const config = require("config");

function admin(req, res, next) {
  const token = req.header("x-auth-token");

  if (!config.get("requiresAuth")) return next();

  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied. Unauthorized user");
  }
  next();
}

module.exports = admin;
