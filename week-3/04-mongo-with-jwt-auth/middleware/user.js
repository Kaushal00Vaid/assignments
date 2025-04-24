function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const jwtToken = req.headers["authorization"]?.split(" ")[1];
  if (!jwtToken) {
    return res.status(401).json({ message: "invalid token" });
  }
  let decoded;
  try {
    decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (decoded.username) {
    req.username = decoded.username;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = userMiddleware;
