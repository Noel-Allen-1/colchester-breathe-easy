import { connectToDatabase } from "/lib/mongodb";
import {ObjectId} from "mongodb";
async function handler(req, resp){
    
    console.log(req.method);
     const {eventId} = req.query
     if(req.method !== 'DELETE') return
        const {db} = await connectToDatabase();
        const collection = await db.collection('events')
        const result = await (await collection.deleteOne( { _id: new ObjectId(eventId)}).deletedCount);
        return resp.json({
            event: result,
            message: "Event record deleted"
        })
}
export default handler