// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const options = {};


// let mongoClient;

// if (!process.env.MONGODB_URI) {
//     throw new Error("please add your Mongo URI to the .env.local");
// }

export async function connectToDatabase(){
    console.log(66666);
    // try {
    //     if( mongoClient){
    //         return {mongoClient};
    //     }
    //     mongoClient = await (new MongoClient(uri, options)).connect();
    //     console.log("just connected");
    //     return {mongoClient};
    // } catch (e) {
    //     console.error(e);
    // }
}