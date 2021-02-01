const express = require('express')
const Router = express.Router()
const { Favorite } = require('../models/Favorite')
const { auth } = require('../middleware/auth')


Router.post('/getFavoriteNumber',(req, res) => {
   
    Favorite.find({"movieId":req.body.movieId})
    .exec((err,favorite)=>{
        if(err) return res.status(400).json({success:false , err})
        res.status(200).json({success:true,favoriteNumber: favorite.length})
    })
    
});
Router.post('/getFavorited',(req, res) => {
    Favorite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
    .exec((err,favorite)=>{
        if(err) return res.status(400).json({success:false , err})

        let result = false
        if(favorite.length !== 0){
            result = true
        }
        res.status(200).json({success:true,favorited:result})
    })
    
    
});

Router.post('/upFavorite',(req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err,result)=>{
        if(err) return res.status(400).json({success:false , err})
        res.status(200).json({success:true})
    })
});

Router.post('/unFavorite',(req, res) => {

    Favorite.findOneAndDelete({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.status(400).json({success:false , err})
        res.status(200).json({success:true,doc})
    })
});

Router.post('/getFavorites',(req, res) => {
    Favorite.find({userFrom:req.body.userId})
    .exec((err,favorites)=>{
        if(err) return res.status(400).json({success:false , err})
        res.status(200).json({success:true,favorites})
    })
    
    
});


module.exports = Router;