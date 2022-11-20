import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
     const {eventId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('events')
     const result = await (await collection.deleteOne({_id: new ObjectId(eventId)})).deletedCount;
     return resp.json({
         event: result,
         message: "To do deleted"
     })
}
export default handler