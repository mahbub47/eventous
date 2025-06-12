import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/authenticationRequest";

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token provided", tokenProvided: false });
    console.log("NO TOKEN PROVIDED!!!");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("JWT PAYLOAD before setting req: ", decoded);
    (req as AuthenticatedRequest).user = decoded;
    console.log("JWT PAYLOAD after setting req: ", decoded);
    next();
    return;
  } catch (err) {
    res.status(403).json({ message: "Invalid token", error: err });
    console.log("INVALID TOKEN!!!");
    return;
  }
};
