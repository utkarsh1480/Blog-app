import confg from "../conf/config.js";
import { Client, Account, ID } from "appwrite";


export class AuthServices{
   client = new Client()
   account;

   constructor(){
    this.client
          .setEndpoint(confg.appwriteUrl)
          .setProject(confg.projectId );
          this.account = new Account(this.client);
   }
   async createAccount({ email, password, userName}){
    try{
       const user =  await this.account.create({
           userId: ID.unique(),
            email: email,
            password: password,
            name: userName
        })
        if(user){
            await this.login({ email, password });
            return user;
        }
        return user;
    } catch(err){
        throw err;
    }
   }

   async login({email, password}){
    try{
        await this.account.createEmailPasswordSession({
            email: email,
            password: password
        })
        return;
    } catch(err){
        throw err;
    }
   }

   async getcurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
         console.log("Appwrite serive :: getCurrentUser :: error", error);
       
    }
     return null;
   }

   async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        throw error;
    }
   }
};

const authService = new AuthServices();

export default authService;


