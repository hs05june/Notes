const express = require('express');
const router = express.Router();
const User = require('../module/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const getUser = require('../middleware/getUser');
const { response } = require('express');
const SECRET_KEY = "Mitra_Di_Chhatri"

// Create User
router.post('/', [
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // res.send(req.body);
    if (await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })) {
        return res.status(400).json({ error: "User with same username and email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    var newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
        salt: salt
    });
    await newUser.save().then(() => {
        // res.send(newUser);
        console.log(newUser);
        const token = jwt.sign({ id: newUser.id }, SECRET_KEY);
        res.json({token})
    }).catch(err => console.error(err));}
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Login User
router.post('/login', [
    body('username').exists(),
    body('password').exists()
], async(req, res) => {

        try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var user = await User.findOne({username: req.body.username});

    if(user){
        var check = await bcrypt.compare(req.body.password,user.password);
        if(check){
            const token = jwt.sign({id: user.id},SECRET_KEY);
            console.log(token);
            res.json({token});
        }
        else{
            res.send("Enter correct username and password!");
        }
    }
    else{
        res.send("Enter correct username and password!");
    }}catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

// Get User
router.post('/getuser',getUser,async(req,res)=>{
    try{console.log(req.user.id);
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Error");
    }
});

module.exports = router;
