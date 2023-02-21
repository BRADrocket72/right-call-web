import User from '../../data/mongo/User'
import crypto from'crypto';
import jwt from'jsonwebtoken';
import { UserDto } from '../../data/model/UserDto';
import {IUserDoc} from '../../data/mongo/schemas/UserSchema';

const userDb = new User();

exports.create_user = async (req, res) => {

    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;

    const user = await userDb.findUserByEmail( req.body.email);
    if (user != undefined) {
        return res.status(400).send('That email is already in use!')
    }
    try {
        const data:UserDto = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
            salt: salt
        }
        res.header('Access-Control-Allow-Origin', '*')
        const savedData = userDb.createUser(data)
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.get_by_username = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const userName = req.params.username
        const data = await userDb.findUserByUsername(userName)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await userDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.delete_user = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const data = await userDb.deleteUser(id)
        res.send(`Document with ${data.userName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.user_login = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const userName = req.body.userName
        const userByUsername = await userDb.findUserByUsername(userName)
        const userByEmail = await userDb.findUserByEmail(userName)
        if (userByEmail == null && userByUsername ==null) {
            res.status(200).json({ success: false })
            return
        } 
        let user : IUserDoc;
        userByUsername!= null ? user = userByUsername : user= userByEmail 
            const hash = crypto.createHmac('sha512', user.salt)
                .update(req.body.password)
                .digest("base64");
            req.body.password = user.salt + "$" + hash;
            if (user.password != req.body.password) {
                res.status(200).json({ success: false })
            } else {
                const refreshId = user._id + process.env.jwtSecret
                const salt = crypto.randomBytes(16).toString('base64');
                const hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
                const token = jwt.sign({ userId: user._id }, process.env.jwtSecret);
                const b = Buffer.from(hash);
                const refresh_token = b.toString('base64');
                res.status(201).send({ accessToken: token, refreshToken: refresh_token, success: true, userType: user.userType });
            }     
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}