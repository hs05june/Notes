const express = require('express');
const router = express.Router();
const User = require('../module/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { default: userEvent } = require('@testing-library/user-event');
const SECRET_KEY = "Mitra_Di_Chhatri"

const getUser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"No Token"});
    }
    try{
        var data = jwt.verify(token,SECRET_KEY);
        req.user = data;
        next();
    }
    catch(err){
        res.status(401).send({error:"Invalid Token"});
        console.log("neeche wala");
    }
}
module.exports = getUser;