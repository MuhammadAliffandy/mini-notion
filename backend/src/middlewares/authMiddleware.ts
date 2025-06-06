import jwt from "jsonwebtoken";
import CustomResponse from "../lib/customResponse";
import errorHandler from "../lib/errorHandler";
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      res.status(401).json(new CustomResponse("FAIL", "Access Token is Required"));
      return
    }
  
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err || !decoded) {
          res.status(403).json(new CustomResponse("FAIL", "Invalid Token"));
          return;
        }
  
        res.locals.user = decoded
        next();
      }
    );
  } catch (error: Error | any) {
    errorHandler(error, res);
  }
};

export default verifyJWT;
