import express,{Application} from 'express';
import config from 'config';
import consola from 'consola';
import helmet from 'helmet'
import mongoose from 'mongoose';
import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';
import { ApolloServer, AuthenticationError, makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from "graphql-middleware";
import getUser from '../auth/getUser';
import Auth from '../middleware/Auth';

const env = config.get('env') as string;
const port = config.get('PORT') as number;
const db = config.get('MONGO_URL') as string;

export function start(){
    const app: Application = express();
    //app.use(Auth)
    try{
        if(env==="production"){
            app.use(helmet());
        }
        const connectDB = async () => {
          try {
            await mongoose.connect(db, {
              useNewUrlParser: true,
              useCreateIndex: true,
              useFindAndModify: false,
              useUnifiedTopology: true
            });
        
            console.log("MongoDB Connected...");
          } catch (err) {
            console.error(err.message);
            process.exit(1);
          }
        }
        connectDB();
        
         
        
        const server = new ApolloServer({ 
          schema: applyMiddleware(
            makeExecutableSchema({ typeDefs, resolvers })
          ),
          context: ({ req }) => {
              const user = getUser(req);
              if (!user) throw new AuthenticationError('you must be logged in');
              return { user };
          }
          }
            );
        server.applyMiddleware({app})
        app.listen(port,()=>consola.info(`🚀 Server running on port ${port}${server.graphqlPath}`))
      }catch(e){
        throw new Error(e.message);
    }
}