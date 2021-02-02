import React, { useEffect, useState } from 'react'
import { IMAGE_BASE_URL } from '../../Config'
import axios from 'axios'
import './FavoritePage.css'
import { Popover, Button } from 'antd';

function FavoritePage() {
    const [favoriteMovies,setFavoriteMovies] = useState([])

    useEffect(()=>{
        let variable = {
            userId:localStorage.getItem('userId')
        }
        axios.post('/api/favorite/getFavorites',variable)
        .then(res=>{
            if(res.data.success){
                setFavoriteMovies(res.data.favorites)
            }else{
                alert('failed get favorites')
            }
        })
    },[])

    const onClickDelete = (movieId,userFrom) => {
        
        let Variable = {
            movieId,
            userFrom
        }

        axios.post('/api/favorite/unFavorite',Variable)
        .then(res=>{
            if(res.data.success){
                setFavoriteMovies(favoriteMovies.filter(movie => movie._id !== res.data.doc._id))
            }else {
                alert('failed unFavorite')
            }
        })
    }

    const renderCards = favoriteMovies.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} alt={favorite.title} /> : "no image"
                }
            </div>
        )


        return (
            <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`} >
                <td>  <a href={`/movie/${favorite.movieId}`} >{favorite.movieTitle}</a></td>
            </Popover>

            <td>{favorite.movieRunTime} mins</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>

        </tr>
        )
    })




    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
        <h2> Favorite Movies </h2>
        <hr />

        <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie RunTime</th>
                    <td>Remove from favorites</td>
                </tr>
            </thead>
            <tbody>


                {renderCards}


            </tbody>
        </table>
    </div>
    )
}

export default FavoritePage
