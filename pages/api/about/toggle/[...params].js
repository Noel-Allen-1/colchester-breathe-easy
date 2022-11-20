import { MongoClient, ObjectId } from "mongodb"
async function handler(req, resp){
    if(req.method !== 'GET') return
    
    var query = { _id: new ObjectId(req.query.params[0].toString())};
    const options = {upsert: true }
    const updateAbout = {
         $set: { 
            done: req.query.params[1] } 
      };
    const client = await MongoClient.connect("mongodb+srv://madmax:ug4ArmxSIovAwRlS@cluster0.q5kds.mongodb.net/heroku_02d2h7l5?retryWrites=true&w=majority")
    const db = client.db()
    const collection = db.collection("about")
    const result = await collection.updateOne(query, updateAbout, options);
    client.close()
    console.log("updated record::::"+result)
    return resp.json({
        todo: result,
        message: "About updated!"
    })
}
export default handler