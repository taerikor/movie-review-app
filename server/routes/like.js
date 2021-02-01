const express = require('express')
const Router = express.Router()


const { Like } = require('../models/Like')
const { Dislike } = require('../models/Dislike')
// const { auth } = require('../middleware/auth')


Router.post('/getLikes',(req,res)=>{
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
    .exec((err, likes) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, likes })
    })

})

Router.post('/getDislikes',(req,res)=>{
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
    .exec((err, dislikes) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, dislikes })
    })

})

Router.post('/onLike',(req,res)=>{
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId , userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const like = new Like(variable)

    like.save((err, like)=>{
        if(err) return res.status(400).send(err)

        Dislike.findOneAndDelete(variable)
        .exec((err, dislike)=>{
            if(err) return res.status(400).json({success:false , err})
            res.status(200).json({success:true})
        })
    })
})

Router.post('/unLike',(req,res)=>{
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId , userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }


    Like.findOneAndDelete(variable)
    .exec((err, result)=>{
        if(err) return res.status(400).json({success:false , err})
        res.status(200).json({success:true})
    })
})

Router.post('/onDislike',(req,res)=>{
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId , userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const dislike = new Dislike(variable)

    dislike.save((err, dislike)=>{
        if(err) return res.status(400).send(err)

        Like.findOneAndDelete(variable)
        .exec((err, like)=>{
            if(err) return res.status(400).json({success:false , err})
            res.status(200).json({success:true})
        })
    })
})

Router.post('/unDislike',(req,res)=>{
    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId , userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }


    Dislike.findOneAndDelete(variable)
    .exec((err, result)=>{
        if(err) return res.status(400).json({success:false , err})
        res.status(200).json({success:true})
    })
})

module.exports = Router;