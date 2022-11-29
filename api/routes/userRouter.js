const express = require('express');
const User = require('../models/User');
const crypto = require('crypto');
const router = express.Router()

//Post Method
router.post('/users/post', async (req, res) => {

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                     .update(req.body.password)
                                     .digest("base64");
    req.body.password = salt + "$" + hash;

    const data = new User({
        userName: req.body.userName,
        password: req.body.password,
        userType: req.body.userType,
        salt : salt
    })

    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/users/getAll', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/user/delete/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.userName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/users/login', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const user = await User.findOne({userName: req.body.userName})
        if (user == null){
            res.status(200).json({success:false})
        }else{
            let hash = crypto.createHmac('sha512',user.salt)
                            .update(req.body.password)
                            .digest("base64");
            req.body.password = user.salt + "$" + hash;
            if (user.password != req.body.password){
                res.status(200).json({success:false})
            }else{
                res.status(200).json({success:true})
            }
        }

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;