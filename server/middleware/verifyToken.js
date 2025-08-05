// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Received Header:", authHeader); // LOG HEADER

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded JWT:", decoded); // LOG DECODED JWT

    req.user = { id: decoded.userId || decoded.id };

    next();
  } catch (error) {
    console.error("JWT verification error:", error.message); 
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;