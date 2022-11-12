import Router from 'next/router';
import { connectToDatabase } from "/lib/mongodb";

export default async function handler(request, response){
 
    try{
        let {db} = await connectToDatabase();
        let usersin = await request.body;
        switch(request.method){
            case "GET":
                response = await db.collection('users')
                .find({})
                .toArray()
            break;
            case "POST":
                const response = await db.collection('users')
                .insertOne(
                    JSON.parse(usersin)
                )
                return response.json({
                    message : "Added user successfully",
                    success: true
                })
            break;    

        }
        

       


        return response.json({
            
            message:JSON.parse(JSON.stringify(usersin)),
            success:true
        })   
       
    }catch(e){
        return response.json({
           message: new Error(e).message,
            success:false 
        });
        
    }
    
}