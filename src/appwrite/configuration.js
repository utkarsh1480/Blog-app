import { Client, Databases, ID, Storage} from "appwrite";
import { data } from "react-router-dom";
import conf from '../conf/config.js'

export class Service{
    client = new Client();
   databases;
    bucket;

    constructor(){
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.projectId );
          this.databases = new Databases(this.client);
          this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument({
            databaseId: conf.databaseId,
            collectionId: conf.collectionId,
            documentId:  slug,
            data : {
                title,
                content,
                featuredImage,
                status,
                 userId
            }

        }) 
        } catch(err){
            console.log("App write create Post erro");
            throw err;
            
        }
       
    } 

    async updatePost(slug, {title, content, featuredImage, status}){

        try {
           return  await this.databases.updateDocument({
            databaseId: conf.databaseId,
            collectionId: conf.collectionId,
            documentId : slug,
             data : {
                title,
                content,
                 featuredImage,
                status,userId
            }
            })
        } catch (error) {
            console.log("Appwrite Service updatePost Error");
            throw err;
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
            databaseId: conf.databaseId,
            collectionId: conf.collectionId,
            documentId: slug,
            })
            return true;
        } catch (error) {
            console.log("Appwrite Service Delete Post error");
            return false;
        }
    }

    async getPost(slug){
        try {
           return await this.databases.getDocument({
            databaseId: conf.databaseId,
            collectionId: conf.collectionId,
             documentId: slug
            })
        } catch (error) {
            console.log("Appwrite Service GetPost error");
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments({
            databaseId: conf.databaseId,
            collectionId: conf.collectionId,
            queries
            })
        } catch (error) {
           console.log(`Appwrite Service GetPosts error ${error}`); 
          
        }
         return null;
    }

    //Upload file Services

    async uploadFile(file){
        try{
       return  await this.bucket.createFile({
            bucketId : conf.bucketId,
            fileId : ID.unique(),
            file
        })
        
    } catch(err){
        console.log("Appwrite Service Upload file error");
        return null;
    }
    }

    async deletefile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId : conf.bucketId,
                fileId : fileId
            })
        } catch (error) {
            console.log("Appwrite Deletefile service error");
            return false;
        }
    }

    getFileView(fileId){
        return this.bucket.getFileView({
            bucketId : conf.bucketId,
            fileId
        })
    }
};




const service = new Service();
export default service;