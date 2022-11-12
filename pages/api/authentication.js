import { connectToDatabase } from "../../lib/connectToDatabase";

export default async function handler(request, response){
    try{
        const { mongoClient } = await connectToDatabase();
        const db = mongoClient.db("heroku_02d2h7l5");
        const collection = db.collection("users");
        
        const users = await collection
            .fetch()
            
            .limit(10)
            .toArray();
            response.status(200).json(users);
    }catch (e){
        console.error(e);
        response.status(500).json(e);

    }
}