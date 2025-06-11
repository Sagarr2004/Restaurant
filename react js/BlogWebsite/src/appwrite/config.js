import conf from '../conf.js';
import {Client, ID,Databases,Storage,Query} from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket; //Storage

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client); 
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
         return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
         )
        }catch(error){
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }catch(error){
            console.log("Appwrite Service :: updatePost Error ",error);
        }
    }

    async deletePost(slug){

        try{
           await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
          )
          return true;
        
        }catch(error){
            console.log("Appwrite Error :: deletePost Error ",error);
            return false;
        }

    
    }

    async getPost(slug){
        try{
           return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           )

        }catch(error){
            console.log("Appwrite Error :: getPost :: Error ",error);
            return false;
        }
    }


    async getPosts(queries = [Query.equal("status","active")]){
         try{
             return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries //this is query where we checking the status === active or not 
             )
         }catch(error)
         {
            console.log("Appwrite Error :: getPosts :: error ",error);
            return false;
         }
    }


    //file Upload Services

    async uploadFile(file){
        try{
            return await  this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Appwrite Error :: uploadFile error ",error);
            return false;
        }
    }


    //File Delete Service

    async deleteFIle(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.log("Appwrite Servie :: DeleteFIle Error ",error);
            return false;
        }
    }


    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }





}

const service = new Service();

export default service;
