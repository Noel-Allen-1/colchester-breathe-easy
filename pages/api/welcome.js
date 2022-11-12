import { ObjectId } from "mongodb";
import { connectToDatabase } from "/lib/mongodb";

export default async function handler(request, response){
    switch(request.method){
        case 'GET':
           return getWelcome(request, response); 
        break;
          
        case 'POST':
            return postWelcome(request, response); 
        break; 
        
        case 'PUT':
            return putWelcome(request, response); 
        break;
        
        case 'DELETE':
            return delWelcome(request, response); 
        break;    
    }
    
    async function getWelcome(request, response){

        try{
            let {db} = await connectToDatabase();
            let cbewelcome = await db.collection('welcome')
                .find({})
                .toArray()
            return response.json({
                
                message:JSON.parse(JSON.stringify(cbewelcome)),
                success:true
            })   
        }catch(e){
            return response.json({
            message: new Error(e).message,
                success:false 
            });
            
        }
    }
    async function postWelcome(request, response){
        try{
            let {db} = await connectToDatabase();
            await db.collection('welcome')
                    .insertOne(JSON.parse(request.body))
            return response.json({
                message: 'Welcome article added successfully',
                success: true
            })

        }catch(error){
            return response.json({
                message: new Error(error).message,
                succees: false
            })
        }
    }

    async  function  putWelcome(request, response){
        const _id = await request.body._id;
        const header = await request.body.header;
        const body = await request.body.body;
        console.log(header);
        try{
            let {db} = await connectToDatabase();
            await db.collection('welcome')
            .updateOne({
                "_id": new ObjectId(_id)
            },{
                $set: {
                    'header' : header,
                    'body' : body
                    } 
                }
            )
            
            return response.json({
                message: "Welcome article updated successfully",
                success: true
            })
        }catch(error){
            return response.json({
                message: new Error(error).message,
                success: false
            })
        }
    }

    async function delWelcome(request, response){
        try{
            
            let {db} = await connectToDatabase();
            await db.collection('welcome')
            .deleteOne({
                _id : new ObjectId(request.body)
            })
            return response.json({
                message: "Welcome article deleted",
                success: true
            })

        }catch(error){
            return response.json({
                message: new Error(error).message,
                success: false
            })
        }
    }
}