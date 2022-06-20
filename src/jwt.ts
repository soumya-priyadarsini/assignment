
const jwt = require("jsonwebtoken");
import express from 'express'
import config from "./config";

// Authorization Utility Functions
export const getToken = (id: any) => {
  const payload = { subject: id };
  return jwt.sign(payload, config.tokenSecret);
};
export const validateToken = (
  req: express.Request | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.headers.authorization) {
    return false;
  }
  // decoding the token from headers
  let token = req.headers.authorization.split(" ")[1];//Bearer TOKEN
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'UNAUTHORIZED_REQUEST'
    })
  }
  jwt.verify(token, config.tokenSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'UNAUTHORIZED_REQUEST'
      })
    } else {
      // if found then it attaches or set in the userId in req
      req.userId = decoded.subject
    }
  })
  next() // this means it has finished its job and passed to next function
};