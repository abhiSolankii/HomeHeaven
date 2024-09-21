import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const verifyToken = (req, res, next) => {
  dotenv.config();
  const token = req.cookies.real_token;

  if (!token) return res.status(401).send({ message: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).send({ message: "Token is n ot Valid" });
    req.userId = payload.id;
    next();
  });
};
