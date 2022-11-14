import { connectToDatabase } from "/lib/mongodb";

async function handler(req, resp){
    if(req.method !== 'POST') return
    const {heading, description} = req.body
    const done = "false"
    if(!heading || !description) return
    
    // const client = await MongoClient.connect("{mongo connection string}")
    // const db = client.db()
    // const collection = db.collection("todos")

    let {db} = await connectToDatabase();
    let collection = await db.collection('todos')

    const result = await collection.insertOne({heading, description, done})
    resp.status(201).json({
        todo: result,
        message: "To do created"
    })
}
export default handler