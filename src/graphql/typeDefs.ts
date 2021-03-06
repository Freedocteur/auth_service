import { gql } from 'apollo-server-express';
import dateScalar from './dateScalar'

export default gql`
  scalar dateScalar
  scalar number
  type Subscription {
         subscription: String!
         date_start: dateScalar!
         date_end: dateScalar!
         status:String! 
    }

  type User {
    _id: ID!
    firstname: String
    lastname: String
    phoneNumber:  String
    email:  String
    username: String
    password: String
    address:  String
    status: String
    state: String
    tokenForSetting: Token
    role: String
    description: String
    specialite: String
    Structure: String
    nationality: String
    indicatif: String
    country: String
    homeworking: String
    email_home_working:String
    phone_home_working: String
    subscriptions: Subscription
    photo: String
    isDeleted:Boolean
    assurance: Assurance
    assurance_tpc: number,
  }


  type AuthPayload {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Token {
      id: ID
      token: String!
      date: dateScalar
  }

  type Structure {
    id: ID
    name: String
    adresse:String!
    numberphone:String!
    email:String!
    isDeleted: Boolean!
    createdAt: dateScalar!
    updatedAt: dateScalar!
  }

  type Assurance {
    _id: ID
    name: String
    adresse:String
    numberphone:String
    email:String
    createdAt: dateScalar
    updatedAt: dateScalar
  }
 
  input Subscriber 
  {
    subscription: String!
    date_start: dateScalar!
    date_end: dateScalar!
    status:String! 
  }

   input AssuranceInput
   {
    name: String!
    adresse: String!
    numberphone: String!
    email: String!
  }
       
      input UserInput
       {
        firstname: String
        lastname: String
        phoneNumber:  String
        email:  String
        password: String
        address:  String
        status: String
        state: String
        tokenForSetting: String
        role: String!
        description: String
        specialite: String
        Structure: String
        nationality: String
        indicatif: String
        country: String
        homeworking: String
        email_home_working:String
        phone_home_working: String
        assurance: String
        assurance_tpc: number
        subscriptions: Subscriber
      }
      input StructureInput {
        name: String!
        adresse:String!
        numberphone:String!
        email:String!
        isDeleted: Boolean!
      }

      input TokenInput
      {
        token: String!
        date: dateScalar
      }

      type Query
       {
        getUsers: [User]
        getOneUser(id: String): User!
        getUserByRole(role: String): User
        getAssurance(id: String): Assurance!
        getOneAssurance: Assurance
        getAssurances: [Assurance]
        facebookAuth(accessToken: String!): Token
        getUserByToken(token: String): Token
        getStructures: [Structure]
        getOneStructure(id: String): Structure!
        getStructureByAttribut(attribut: String!): [Structure]
        getToken(params: String): String
        login(phoneNumber:String! , password: String!): AuthPayload!
      }

      type Mutation
       {
          registerPatient(phone: String, password: String): AuthPayload!
          googleAuthMedecin(accessToken: String!): Token!
          facebookAuth(accessToken: String!): Token!
          updateUser(id: String, data: UserInput): User
          addAssurance(data: AssuranceInput): Assurance
          updateAssurance(id: String, data:AssuranceInput): Assurance
          deleteAssurance(id: String): Boolean!
          signin(username: String, password: String): AuthPayload
          signup(username: String, password: String): AuthPayload
          signUp(username: String, password: String): AuthPayload
          loginPatient(phone: String!, password: String!): Token
          sendForgotPasswordEmail(email: String!): Boolean
          sendForgotPasswordPhone(phoneNumber: String!): Boolean
          forgotPasswordChange(newPassword: String!, key: String!): User


          addStructure(data: StructureInput): Structure
          updateStructure(id: String, data: StructureInput): Structure!
          deleteStructure(id: String): Boolean!
       }
      schema 
      {
        query: Query
        mutation: Mutation
      }
`;