const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const jwt_token = req.headers["authorization"]?.split(" ")[1];
  if (!jwt_token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let decoded;
  try {
    decoded = jwt.verify(jwt_token, "my_super_secret_key");
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const username = decoded.username;
  const isAdmin = Admin.findOne({ username });
  if (!isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

module.exports = adminMiddleware;
