import { MongoClient, ObjectId } from "mongodb"
async function handler(req, resp){
    if(req.method !== 'PUT') return
    const query = { _id: new ObjectId(req.query.params[0].toString())};
    const data = JSON.parse(req.body);
    const options = {upsert: true }
    const updateAbout = {
         $set: { 
            heading: data.heading,
            description: data.description
        } 
      };
    const client = await MongoClient.connect("mongodb+srv://madmax:ug4ArmxSIovAwRlS@cluster0.q5kds.mongodb.net/heroku_02d2h7l5?retryWrites=true&w=majority")
    const db = client.db()
    const collection = db.collection("about")
    const result = await collection.updateOne(query, updateAbout, options);
    console.log("updated record::::"+result)
    return resp.json({
        about: result,
        message: "To do updated!"
    })
}
export default handler