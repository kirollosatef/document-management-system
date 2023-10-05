import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { MESSAGES, JWT_SECRET } from "../config.js";

const authenticate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res
      .status(401)
      .json({ message: MESSAGES.youAreNotLoggedIn, error: "No token!" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ message: MESSAGES.youAreNotLoggedIn, error: "Invalid token!" });

    const user = await User.findById(decoded._id);

    if (!user)
      return res
        .status(401)
        .json({ message: MESSAGES.noUserFounded, error: "No user found!" });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message, error: err });
  }
};

export default authenticate;
