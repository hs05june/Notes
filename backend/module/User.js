const mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
                name:{
                    type: 'string',
                    required: true
                },
                username:{
                    type:'string',
                    required: true,
                },
                email:{
                    type:'string',
                    required: true,
                },
                password:{
                    type:'string',
                    required: true
                },
                salt:{
                    type:'string'
                }
        });

const User = mongoose.model('User', userSchema);
module.exports = User;