import { MongoClient, ObjectId } from "mongodb"
async function handler(req, resp){
    if(req.method !== 'GET') return
    
    var query = { _id: new ObjectId(req.query.params[0].toString())};
    const options = {upsert: true }
    const updateTodo = {
         $set: { 
            done: req.query.params[1] } 
      };
    const client = await MongoClient.connect("mongodb+srv://madmax:ug4ArmxSIovAwRlS@cluster0.q5kds.mongodb.net/heroku_02d2h7l5?retryWrites=true&w=majority")
    const db = client.db()
    const collection = db.collection("todos")
    const result = await collection.updateOne(query, updateTodo, options);
    client.close()
    console.log("updated record::::"+result)
    return resp.json({
        todo: result,
        message: "To do updated!"
    })
}
export default handler