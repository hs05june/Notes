const express = require('express');
const router = express.Router();
const Note = require('../module/Note')
const getUser = require('../middleware/getUser');
const { body, validationResult } = require('express-validator');

// Get All Notes
router.get('/fetchall',getUser,async(req,res)=>{
    try{
    const note = await Note.find({user:req.user.id});
    res.send(note);}
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// Add a note
router.post('/add',getUser,[
    body('title','Give a title').isLength({min:1}),
    body('content','Give some content').isLength({min:1})
],async(req,res)=>{
    try{    
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }

            var newNote = new Note({
            user:req.user.id,
            title:req.body.title,
            content:req.body.content,
            tag:req.body.tag
        })

        await newNote.save().then(()=>{
            res.json(newNote);
        }).catch((err)=>{
            console.error(err);
        })

    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

// Update a note
router.put('/update/:id',getUser,async(req,res)=>{
    try{
        let requiredUser = await Note.find({user: req.user.id});
        if(!requiredUser){return res.status(401).send("Access Denied");}
        
        let requiredNote = await Note.findById(req.params.id);
        if(!requiredNote){return res.status(404).send("Not Found");}
        
        if(requiredNote.user!=req.user.id){return res.status(401).send("Access Denied");}

        var query = {};
        if(req.body.title){query.title = req.body.title};
        if(req.body.content){query.content = req.body.content};
        if(req.body.tag){query.tag = req.body.tag};
        query.lastUpdated = Date.now();

        await Note.findByIdAndUpdate(req.params.id, {$set:query}).then(()=>{
            res.json(requiredNote);
        }).catch(err=>{
            console.log(err);
        });
    }catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
})

// delete a note
router.delete('/delete/:id',getUser,async(req,res)=>{
    try{
    let requiredUser = await Note.findOne({user:req.user.id});
    if(!requiredUser){return res.status(401).send("Access Denied");}

    let requiredNote = await Note.findById(req.params.id);
    if(!requiredNote){return res.status(404).send("Not Found");}
    
    if(requiredNote.user!=req.user.id){return res.status(401).send("Access Denied");}

    await Note.findByIdAndDelete(req.params.id,).then(()=>{
        res.send("Succesfully Deleted!!");
    }).catch((err)=>{
        console.log(err);
    })
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router