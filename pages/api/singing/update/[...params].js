import { MongoClient, ObjectId } from "mongodb"
async function handler(req, resp){
    if(req.method !== 'PUT') return
    const query = { _id: new ObjectId(req.query.params[0].toString())};
    const data = JSON.parse(req.body);
    const options = {upsert: true }
    const updateSinging = {
         $set: { 
            heading: data.heading,
            description: data.description,
            image: data.image,
            imageID:data.imageID,
            video: data.video
        } 
      };
    const client = await MongoClient.connect("mongodb+srv://madmax:ug4ArmxSIovAwRlS@cluster0.q5kds.mongodb.net/heroku_02d2h7l5?retryWrites=true&w=majority")
    const db = client.db()
    const collection = db.collection("singing")
    const result = await collection.updateOne(query, updateSinging, options);
    console.log("updated record::::"+result)
    return resp.json({
        event: result,
        message: "Singing updated!"
    })
}
export default handler