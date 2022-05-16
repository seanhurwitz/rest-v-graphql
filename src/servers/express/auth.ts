import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { sendExpressError } from "../../utils/errors";

const authorizeToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization || "")
      .replace("Bearer", "")
      .trim();
    if (!token) {
      throw new Error("No Authentication Token Provided");
    }
    const decoded = verify(token, "JWTSECRET!");
    res.locals.userId = decoded;
    next();
  } catch (e) {
    sendExpressError(res, e, 403);
  }
};

const authorizeUserFromReqParams = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id !== res.locals.userId) {
      throw new Error("You are not authorized to view this user");
    }
    next();
  } catch (e) {
    sendExpressError(res, e, 403);
  }
};

export { authorizeToken, authorizeUserFromReqParams };
