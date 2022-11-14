import { connectToDatabase } from "/lib/mongodb";

export default async function handler(request, response){
    console.log(request.query)
    const postid = request.query;
    try{
        let {db} = await connectToDatabase();
        let cbehomes = await db.collection('todos', {
           
                method: 'DELETE',
                body: postid
            
        })
        
        return response.json({
            
            message:JSON.parse(JSON.stringify(cbehomes)),
            success:true
        })   
    }catch(e){
        return response.json({
           message: new Error(e).message,
            success:false 
        });
        
    }
}