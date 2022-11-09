import { apiHandler } from '/helpers/api';
//const users = require('data/users.json');
const {connectToDatabase} = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
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