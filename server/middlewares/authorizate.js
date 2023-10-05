import { MESSAGES } from '../config.js';

const authorizate = (role) => {
  let roles;

  switch (role) {
    case 0:
      roles = ['superadmin'];
      break;
    case 1:
      roles = ['superadmin', 'editor'];
      break;
    case 2:
      roles = ['superadmin', 'editor', 'viewer'];
      break;
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: MESSAGES.youAreNotAuthorized,
      });
    }

    next();
  };
};

export default authorizate;
