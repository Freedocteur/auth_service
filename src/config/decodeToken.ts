import jwt from 'jsonwebtoken';


const  decodedToken = (req: any, requireAuth = true) => {
  const header =  req.req.headers.authorization;
    
  if (header){
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'supersecret');
    return decoded;
  }
  if (requireAuth) {
    throw new Error('Login in to access resource');
  } 
  return null
}

export default decodedToken;