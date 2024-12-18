import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const logger = (req, res, next) => {
  console.log(req.path, req.method);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  
  const ErrResponse = {
    errMsg : err.message
  };

  if(err.isValidation){
    ErrResponse.emptyFields = err.emptyFields;
  }

  if (err.status && err.message) {
    res.status(err.status).json(ErrResponse);
  } else {
    res.status(500).json(ErrResponse);
  }
};

const invalidUrl = (req, res, next) => {
  const err = new Error("Invalid URL");
  err.status = 404;

  next(err);
};

const authenticator = (req, res, next) => {
  // get token from header (authorization)
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  // verify if token exists
  if (!token) {
    const err = new Error("Authentication Token is required.");
    err.status = 401;
    
    return next(err);
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET, async (error, decoded) => {
    if (error) {
      const err = new Error("Token is invalid.");
      err.status = 403;
      
      return next(err);
    }

    // Token is valid, attach decoded payload to the request
    const user = await User.findById(decoded.id);

    if(!user){
      const err = new Error("User does not exist. Token is invalid.");
      err.status = 403;

      return next(err);
    }

    req.user = user;
    next();
  });
}

export default {
  logger,
  errorHandler,
  invalidUrl,
  authenticator
};
