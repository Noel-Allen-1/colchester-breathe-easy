import { connectToDatabase } from "/lib/mongodb";

async function handler(req, resp){
    if(req.method !== 'POST') return
    const {heading, description} = req.body
    const done = "false"
    if(!heading || !description) return
    
    // const client = await MongoClient.connect("{mongo connection string}")
    // const db = client.db()
    // const collection = db.collection("about")

    let {db} = await connectToDatabase();
    let collection = await db.collection('about')

    const result = await collection.insertOne({heading, description, done})
    resp.status(201).json({
        about: result,
        message: "About article created"
    })
}
export default handler