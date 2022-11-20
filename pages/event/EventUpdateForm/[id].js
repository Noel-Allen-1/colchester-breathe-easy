
async function handler(req, resp){
    
    //  const {id} = req.query
     if(req.method !== 'POST') return
 console.log(666);
    // const result = await (await collection.deleteOne({_id: new ObjectId(id)})).deletedCount;
     return resp.json({
         event: {message: "Home article deleted"},
         message: "Home article deleted"
     })
}
export default handler