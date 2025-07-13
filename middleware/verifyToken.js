const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. Token missing or malformed." });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Token verified for user:", decoded.email);
      next();
    } catch (err) {
      console.error("JWT verification error:", err.message);
      res.status(403).json({ message: "Invalid or expired token." });
    }
};
module.exports = verifyToken;