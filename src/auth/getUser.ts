import express from 'express';
import jwt from 'jsonwebtoken'


const getUser = (req: express.Request): string | object => {
  const token = req.headers.authorization || '';
 // const SECRET = process.env.SECRET;
 const SECRET ="ADDHVN477V4Z4D54F7HFGB448522F442"
 const noToken = '';
  if (token) {
    const tokenValue = token.replace('Bearer ', '');
    const user = jwt.verify(tokenValue, SECRET);
    return {
      userId: "602da458998f1a63aef22cda",
      token: user,
      tokenExpiration: 1
    };
  }

  return noToken;
};

export default getUser;