import { ObjectId } from "mongodb";
import { connectToDatabase } from "/lib/mongodb";

export default async function handler(request, response){
    switch(request.method){
        case 'GET':
           return getHome(request, response); 
        break;
          
        case 'POST':
            return postHome(request, response); 
        break; 
        
        case 'PUT':
            return putHome(request, response); 
        break;
        
        case 'DELETE':
            return delHome(request, response); 
        break;    
    }
    
    async function getHome(request, response){

        try{
            let {db} = await connectToDatabase();
            let homes = await db.collection('cbehomes')
                .find({})
                .toArray()
            return response.json({
                
                message:JSON.parse(JSON.stringify(homes)),
                success:true
            })   
        }catch(e){
            return response.json({
            message: new Error(e).message,
                success:false 
            });
            
        }
    }
    async function postHome(request, response){
        try{
            let {db} = await connectToDatabase();
            await db.collection('homes')
                    .insertOne(JSON.parse(request.body))
            return response.json({
                message: 'Home article added successfully',
                success: true
            })

        }catch(error){
            return response.json({
                message: new Error(error).message,
                succees: false
            })
        }
    }

    async  function  putHome(request, response){
        const _id = await request.body._id;
        const header = await request.body.header;
        const body = await request.body.body;
        try{
            let {db} = await connectToDatabase();
            await db.collection('homes')
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
                message: "Home article updated successfully",
                success: true
            })
        }catch(error){
            return response.json({
                message: new Error(error).message,
                success: false
            })
        }
    }

    async function delHome(request, response){
        try{
            
            let {db} = await connectToDatabase();
            await db.collection('homes')
            .deleteOne({
                _id : new ObjectId(request.body)
            })
            return response.json({
                message: "Home article deleted",
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