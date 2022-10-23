import { connectToDatabase } from "../../lib/connectToDatabase";

export default async function handler(request, response){
    console.log("start");
    try{
        const { mongoClient } = await connectToDatabase();
        const db = mongoClient.db("heroku_02d2h7l5");
        const collection = db.collection("articles");
        const results = await collection
            .find({})
            .project({
                heading:"",
                createdAt: "",
                updateAt:""
            })
            .limit(10)
            .toArray();

            response.status(200).json(results);
    }catch (e){
        console.log(124566);
        console.error(e);
        response.status(500).json(e);

    }
}