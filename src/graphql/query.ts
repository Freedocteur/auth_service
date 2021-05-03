import { IResolverMap } from '../interfaces/IResolver';
import errorMessages  from '../config/errorMessages'
import User from '../models/UserModel'
import Assurance from '../models/AssuranceModel'
import { AuthenticationError } from 'apollo-server-express';
import getUser from '../auth/getUser';
import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';


export default  {
      /**
       * 
       * @param parent 
       * @param args 
       * @param context 
       * @param info  
       * Authenticatiocation d'un patient 
       */
      async login(parent: any, args: any, context: any, info: any) {
        console.log("les donnees",args.phoneNumber, args.password);
        try {
          const user = await User.findOne({phoneNumber: args.phoneNumber}, (err: any, doc:any) => {
            console.log(doc, "le document")
          });
          if(!user) {
            throw new Error("User does not Exist");
          }
          const isEqual = await bcrypt.compare(args.password, user.password);
          if(!isEqual) {
            throw new Error("Password incorrect");
          }
          const token = jwt.sign({userId: user.id, phoneNumber: user.phoneNumber},
             'ADDHVN477V4Z4D54F7HFGB448522F442',{
               expiresIn: '1h'
             });
             return {
              userId: user.id,
              token: token,
              tokenExpiration: 1
             }
        } catch (error) {
          throw new Error(error); 
        }
      },
  
    async getUsers(parent: any, args: any, context: any, info: any){
      try {
        const userReturn = getUser(context.req);
        console.log(userReturn, "le user")
        if (!userReturn) throw new AuthenticationError('you must be logged in');
         const user = await User.find();
         if(user){
           return user;
         }
         return null;
      } catch (error) {
        throw new Error(error);  
      }
    },
    async getOneUser(parent: any, args: any, context: any, info: any){
      try {
        let id = args.id
         const user = await User.findOne({_id: id}, (err:any, docs:any) => {
          if(docs){
            return docs;
          }
          else {
            throw new Error('Error 500')
          }
         });
         return user;
      } catch (error) {
        throw new Error(error);  
      }
    },
    async getUserByRole(parent: any, args: any, context: any, info: any) {
      let role = args.role;
      const user = await User.find({role: role}, (err: any, doc: any) => {
        if(doc) {
          return doc
        }
        else {
          throw new Error("Error 500");
          
        }
      });
      return user;
    },
    async getAssurances (parent: any, args: any, context: any, info: any) {
         return await Assurance.find();
    }
  

}