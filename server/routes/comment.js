const express = require('express')
const Router = express.Router()


const { Comment } = require('../models/Comment')
// const { auth } = require('../middleware/auth')


Router.post('/saveComment',(req,res)=>{
    const comment = new Comment(req.body)
   
    comment.save((err,comment)=>{
        if(err) return res.status(400).json({success:false,err})
        Comment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, result) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ success: true, result })
        })
    })
})

Router.post('/getComments',(req,res)=>{
    
    Comment.find({'postId':req.body.movieId})
    .populate('writer')
    .exec((err, comments) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, comments })
    })
})

Router.post('/deleteComment',(req,res)=>{

    Comment.findOneAndDelete({'_id':req.body.commentId})
    .exec((err,comment) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, comment })
    })
})


module.exports = Router;