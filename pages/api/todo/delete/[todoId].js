import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
    console.log(req.method);
     const {todoId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('todos')
     const result = await (await collection.deleteOne({_id: new ObjectId(todoId)})).deletedCount;
     return resp.json({
         todo: result,
         message: "To do deleted"
     })
}
export default handler