import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
    console.log(req.method);
     const {aboutId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('about')
     const result = await (await collection.deleteOne({_id: new ObjectId(aboutId)})).deletedCount;
     return resp.json({
         todo: result,
         message: "About deleted"
     })
}
export default handler