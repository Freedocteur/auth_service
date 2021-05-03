
import jwt from 'jsonwebtoken';
import decodedToken from '../config/decodeToken';

const Auth = (req:any, res:any, next:any) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    req.isAuth = false;
    next();
  }
  const token = authHeader;
  if(!token || token === '') {
    req.isAuth = false;
    next();
  }
  let decodedToken: any;
  try {
    decodedToken =  jwt.verify(token, 'ADDHVN477V4Z4D54F7HFGB448522F442');
  } catch (error) {
    req.isAuth = false;
    next();
  }
  if(!decodedToken) {
    req.isAuth = false;
    next();
  }
  req.isAuth = true;
  req.user = decodedToken
}

export default Auth;