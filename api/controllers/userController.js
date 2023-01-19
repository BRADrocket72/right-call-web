const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


exports.create_user = async (req, res) => {

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;

    let user = await User.findOne({ email: req.body.email });
    if (user != undefined) {
        return res.status(400).send('That email is already in use!')
    }
    try {
        const data = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
            salt: salt
        })
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await data.save();
        res.status(200).json(dataToSave._id)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await User.find();
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
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.userName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.user_login = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const user = await User.findOne({ $or: [{ userName: req.body.userName }, { email: req.body.userName }] })
        if (user == null) {
            res.status(200).json({ success: false })
        } else {
            let hash = crypto.createHmac('sha512', user.salt)
                .update(req.body.password)
                .digest("base64");
            req.body.password = user.salt + "$" + hash;
            if (user.password != req.body.password) {
                res.status(200).json({ success: false })
            } else {
                let refreshId = user._id + process.env.jwtSecret
                let salt = crypto.randomBytes(16).toString('base64');
                let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
                let token = jwt.sign({ userId: user._id }, process.env.jwtSecret);
                let b = Buffer.from(hash);
                let refresh_token = b.toString('base64');
                res.status(201).send({ accessToken: token, refreshToken: refresh_token, success: true, userType: user.userType });
            }
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}