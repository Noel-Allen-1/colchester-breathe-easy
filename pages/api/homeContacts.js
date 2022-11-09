import { connectToDatabase } from "/lib/mongodb";

export default async function handler(request, response){
    try{
        let {db} = await connectToDatabase();
        let cbehomecontacts = await db.collection('cbehomecontacts')
            .find({})
            .toArray()
            console.log(cbehomecontacts);
        return response.json({
            
            message:JSON.parse(JSON.stringify(cbehomecontacts)),
            success:true
        })   
    }catch(e){
        return response.json({
           message: new Error(e).message,
            success:false 
        });
        
    }
}