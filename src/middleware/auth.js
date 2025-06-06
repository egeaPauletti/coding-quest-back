
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (typeof decoded === 'object') {
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

