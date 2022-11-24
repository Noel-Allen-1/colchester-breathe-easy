import { connectToDatabase } from "/lib/mongodb";
import ObjectId from "mongodb";
async function handler(req, resp){
    
     const {newsId} = req.query
     if(req.method !== 'DELETE') return
     let {db} = await connectToDatabase();
     let collection = await db.collection('news')
     const result = await (await collection.deleteOne({_id: new ObjectId(newsId)})).deletedCount;
     return resp.json({
         news: result,
         message: "News article deleted"
     })
}
export default handler