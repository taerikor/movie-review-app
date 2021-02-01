import React, { useEffect, useState } from 'react'
import {Button} from 'antd'
import axios from 'axios'

function FavoriteAction({userFrom,movieId,movieInfo}) {
    const [favoriteNumber,setFavoriteNumber] =useState(0)
    const [favorited,setFavorited] =useState('Favorite')


    let Variable = {
        userFrom,
        movieId,
        moviePost:movieInfo.backdrop_path,
        movieRunTime:movieInfo.runtime,
        movieTitle:movieInfo.title
    }

    useEffect(()=>{

        axios.post('/api/favorite/getFavoriteNumber',Variable)
        .then(res=>{
            if(res.data.success){
                setFavoriteNumber(res.data.favoriteNumber)
            }else {
                alert('failed get Favorite Number')
            }
        })

        axios.post('/api/favorite/getFavorited',Variable)
        .then(res=>{
            if(res.data.success){
                if(res.data.favorited){
                    setFavorited('Unfavorite')
                }
            }else {
                alert('failed get Favorited')
            }
        })
    },[Variable])

    const onFavoriteClick = () => {
       
        if(favorited === 'Favorite'){
            axios.post('/api/favorite/upFavorite',Variable)
            .then(res=>{
                if(res.data.success){
                    setFavoriteNumber(favoriteNumber + 1)
                    setFavorited('Unfavorite')
                }else {
                    alert('failed up Favorite')
                }
            })
        }else{
            axios.post('/api/favorite/unFavorite',Variable)
            .then(res=>{
                if(res.data.success){
                    setFavoriteNumber(favoriteNumber - 1)
                    setFavorited('Favorite')
                }else {
                    alert('failed unFavorite')
                }
            })
        }
    }
    return (
        <Button onClick={onFavoriteClick}>
            {favoriteNumber} {favorited}
        </Button>
    )
}

export default FavoriteAction
