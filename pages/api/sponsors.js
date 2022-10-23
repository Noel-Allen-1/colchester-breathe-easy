import { connectToDatabase } from "../../lib/connectToDatabase";

export default async function handler(request, response){
    try{
        const { mongoClient } = await connectToDatabase();
        const db = mongoClient.db("heroku_02d2h7l5");
        const collection = db.collection("cbesponsors");
        const results = await collection
            .find({})
            
            .limit(10)
            .toArray();
            console.log(results);
            response.status(200).json(results);
    }catch (e){
        console.error(e);
        response.status(500).json(e);

    }
}