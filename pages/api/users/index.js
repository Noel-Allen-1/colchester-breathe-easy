import { apiHandler } from '/helpers/api';
//const users = require('data/users.json');
const {connectToDatabase} = require('../../../lib/mongodb');
console.log(77675);
const ObjectId = require('mongodb').ObjectId;

export default apiHandler(handler);



function handler(req, res) {
    console.log(6666);
    switch (req.method) {
        case 'GET':
            return getUsers();
        break;
        case 'POST':
            return register();
        break;    
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    function register(){
        console.log("Register");
    }

    async function getUsers() {
        // const response = users.map(user => {
        //     const { password, ...userWithoutPassword } = user;
        //     return userWithoutPassword;
        // });

        try{
            let {db} = await connectToDatabase();
            let users = await db.collection('users')
                .find({})
                .toArray()
            users.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
                

            return userWithoutPassword;
            // return res.json({
            //     message:JSON.parse(JSON.stringify(posts)),
            //     success:true
            // })   
        }catch(e){
            return res.json({
               message: new Error(e).message,
                success:false 
            });
            
        }

        return res.status(200).json(response);
    }
}