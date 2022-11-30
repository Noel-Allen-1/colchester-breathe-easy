import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
     const {privacyId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('privacy')
     const result = await (await collection.deleteOne({_id: new ObjectId(privacyId)})).deletedCount;
     return resp.json({
         privacy: result,
         message: "Privacy article deleted"
     })
}
export default handler