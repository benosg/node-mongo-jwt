import { verify } from "jsonwebtoken";
import { secret } from "../config";
function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No Token provided",
    });
  }
  const decoded = verify(token, secret);
  req.userId = decoded.id;
  next();
}
export default verifyToken;
