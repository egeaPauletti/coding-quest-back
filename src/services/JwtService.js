import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  }

  return {
    access_token: jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
  }
}

export const decodedToken = (token) => {
  return jwt.decode(token)
}
export const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error);
      return null;
    }
  }