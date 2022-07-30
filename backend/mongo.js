var mongoose = require('mongoose')

const connectToMongo=()=>{mongoose.connect('mongodb+srv://hs05june:Hargun@harpreet.c6kkb6q.mongodb.net/Notes?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
                        mongoose.connection.on('error', console.error.bind(console,'connection error : '));
                        mongoose.connection.once('open',()=>{console.log("Mongoose connected")});
        }


        module.exports = {
            connectToMongo : connectToMongo
        }