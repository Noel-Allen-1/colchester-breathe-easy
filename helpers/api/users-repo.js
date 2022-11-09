const {connectToDatabase} = require("../../lib/connectToDatabase")
const ObjectId = require('mongodb').ObjectId;

export const usersRepo = {
    // getAll: () => users,
    // getById: id => users.find(x => x.id.toString() === id.toString()),
    // find: x => users.find(x),
    // create,
    // update,
    // delete: _delete
    getByUnPw: () => findUserDetails

}

export async function findUserDetails(user){
    console.log(user.password);
    let {db} = await connectToDatabase();
}