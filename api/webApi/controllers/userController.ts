import User from '../../data/mongo/User'
import crypto from'crypto';
import jwt from'jsonwebtoken';
import { UserDto } from '../../data/model/UserDto';
import {IUserDoc} from '../../data/mongo/schemas/UserSchema';
import { UserDb } from '../../data/db/UserDb';


class UserController {
    private userDb:UserDb = new User();

    constructor(userDb:UserDb){
        this.userDb = userDb;
    }


    create_user = async (req, res) => {

    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;

    const user = await this.userDb.findUserByEmail( req.body.email);
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
        const savedData = this.userDb.createUser(data)
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

    get_by_username = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const userName = req.params.username
        const data = await this.userDb.findUserByUsername(userName)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    get_by_id = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const id = req.params.id
        const data = await this.userDb.findUserById(id)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.userDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    delete_user = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const data = await this.userDb.deleteUser(id)
        res.send(`Document with ${data.userName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

    user_login = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const userName = req.body.userName
        const userByUsername = await this.userDb.findUserByUsername(userName)
        const userByEmail = await this.userDb.findUserByEmail(userName)
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
                const refreshId = user._id + process.env.JWT_SECRET
                const salt = crypto.randomBytes(16).toString('base64');
                const hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                const b = Buffer.from(hash);
                const refresh_token = b.toString('base64');
                res.status(201).send({ accessToken: token, refreshToken: refresh_token, success: true, userType: user.userType });
            }     
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
} 
export default UserController