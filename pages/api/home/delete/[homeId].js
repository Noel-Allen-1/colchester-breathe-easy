import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
     const {homeId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('home')
     const result = await (await collection.deleteOne({_id: new ObjectId(homeId)})).deletedCount;
     return resp.json({
         event: result,
         message: "Home article deleted"
     })
}
export default handler