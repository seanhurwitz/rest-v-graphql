import { Response } from "express";

const sendExpressError = (res: Response, e: any, code = 404) => {
  res.status(e.status || code).send(e.message);
};

const handleError = (shouldThrowError: boolean, message: string) => {
  if (shouldThrowError) {
    throw new Error(message);
  }
};

export { sendExpressError, handleError };
