import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { secret } from '../config/environment.js';

const secureRoute = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer')) {
      return res.status(401).sned({ message: 'Unauthorized access' });
    }

    const token = authToken.replace('Bearer ', '');

    jwt.verify(token, secret, async (err, data) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized access' });
      }

      const user = await User.findById(data.userId);

      if (!user) {
        return res.status(401).send({ message: 'Unathorized' });
      }

      req.currentUser = user;

      next();
    });
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

export default secureRoute;
