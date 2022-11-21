import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
     const {singingId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('singing')
     const result = await (await collection.deleteOne({_id: new ObjectId(singingId)})).deletedCount;
     return resp.json({
         singing: result,
         message: "Singing deleted"
     })
}
export default handler