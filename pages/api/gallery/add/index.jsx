import { connectToDatabase } from "/lib/mongodb";

async function handler(req, resp){
    console.log(23234);
    if(req.method !== 'POST') return
    const {heading, description, image} = req.body
    const done = "false"
   if(!heading || !description || !image) return
    

    let {db} = await connectToDatabase();
    let collection = await db.collection('gallery')

    const result = await collection.insertOne({heading, description, image})
    resp.status(201).json({
        gallery: result,
        message: "Gallery Item created"
    })
    return "success";
}
export default handler