import { connectToDatabase } from "/lib/mongodb";
import {ObjectId} from "mongodb";
async function handler(req, resp){
    
    console.log(req.method);
     const {galleryId} = req.query
    //const queryID =  { _id: new ObjectId(req.query.params[0].toString())};
     if(req.method !== 'DELETE') return
        const {db} = await connectToDatabase();
        const collection = await db.collection('gallery')
        const result = await (await collection.deleteOne( { _id: new ObjectId(galleryId)}).deletedCount);
        return resp.json({
            gallery: result,
            message: "Gallery record deleted"
        })
}
export default handler