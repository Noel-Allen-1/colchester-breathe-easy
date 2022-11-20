import { connectToDatabase } from "/lib/mongodb";

export default async function handler(request, response){
    try{
        let {db} = await connectToDatabase();
        let homecontacts = await db.collection('homecontacts')
            .find({})
            .toArray()
        return response.json({
            
            message:JSON.parse(JSON.stringify(homecontacts)),
            success:true
        })   
    }catch(e){
        return response.json({
           message: new Error(e).message,
            success:false 
        });
        
    }
}