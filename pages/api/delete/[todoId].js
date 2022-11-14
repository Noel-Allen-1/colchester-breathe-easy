import { MongoClient, ObjectId } from "mongodb"
async function handler(req, resp){
    
    const {todoId} = req.query
    if(req.method !== 'DELETE') return
    
    const client = await MongoClient.connect("mongodb+srv://madmax:ug4ArmxSIovAwRlS@cluster0.q5kds.mongodb.net/heroku_02d2h7l5?retryWrites=true&w=majority")
    const db = client.db()
    const collection = db.collection("todos")
    const result = await (await collection.deleteOne({_id: new ObjectId(todoId)})).deletedCount;
    client.close()
    console.log("deleted count::::"+result)
    return resp.json({
        todo: result,
        message: "To do deleted"
    })
}
export default handler