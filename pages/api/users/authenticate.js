const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

import { apiHandler } from '../../../helpers/api';

const { serverRuntimeConfig } = getConfig();
const users = require('../../../data/users.json');
const {connectToDatabase} = require('../../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function authenticate() {
        const { username, password } = req.body;
        let {db} = await connectToDatabase();
            let users = await db.collection('users')
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) throw 'Username or password is incorrect';
        const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    
        return res.status(200).json({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token
        });
    }
}