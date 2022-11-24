import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
     const {exerciseId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('exercise')
     const result = await (await collection.deleteOne({_id: new ObjectId(exerciseId)})).deletedCount;
     return resp.json({
         exercise: result,
         message: "exercise deleted"
     })
}
export default handler