import jwt from "jsonwebtoken";
import "../config.js";

export default function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No Token provided",
    });
  }

  const decoded = jwt.verify(token, secret);
  req.userId = decoded.id;
  next();
}
