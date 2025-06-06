import CustomError from "./customError";
import CustomResponse from "./customResponse";
import { Response } from "express";

const errorHandler = (err: Error ,res: Response, ) => {
  if (err instanceof CustomError) {
    const statusCode = typeof err.code === "number" ? err.code : 500; 
    return res.status(statusCode).json(new CustomResponse("FAIL", err.message));
  }

  return res.status(500).json(new CustomResponse("FAIL", err.message));
};

export default errorHandler;