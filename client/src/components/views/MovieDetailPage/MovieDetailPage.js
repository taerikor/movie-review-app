import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import { Row,Button } from 'antd';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../Commons/GridCards';
import FavoriteAction from '../Commons/FavoriteAction';
import Like from '../Commons/Like';
import Comments from '../Commons/Comment/Comments';
import axios from 'axios'

function MovieDetailPage({match}) {
    const [movie,setMovie] =useState([])
    const [casts,setCasts] =useState([])
    const [toggleCast,setToggleCast] = useState(false)
    const [commentList,setCommentList] = useState([])

    const {params:{movieId}} = match

    const rerenderComponent = (newComment) => {
        setCommentList(commentList.concat(newComment))
    }
    
    const filterState = (array) => {
       setCommentList(commentList.filter(item => item._id !== array._id))

    }

    useEffect(()=> {
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        fetch(endpointForMovieInfo)
        .then(res => res.json())
        .then(res => {
            setMovie(res)
        })
        
        let endpointForCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        fetch(endpointForCast)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setCasts(res.cast)
        })

        axios.post('/api/comment/getComments',{movieId})
        .then(res =>{
            if(res.data.success){
                setCommentList(res.data.comments)
            }else{
                alert('failed get comments')
            }
        })

    },[])

    const onToggleCastClick = () => {
        setToggleCast(!toggleCast)
    }

    return (
        <div>
        <MainImage 
                  image={`${IMAGE_BASE_URL}w1280/${movie.backdrop_path}`}
                  title={movie.title}
                  description={movie.overview}
                  movieId={movie.id}
        />

<div style={{ width: '85%', margin: '1rem auto' }}>

<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <FavoriteAction userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={movie}/>
</div> 
{/* Movie Info */}
    <MovieInfo movie={movie} />
    
    <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}> 
        <Like movie movieId={movieId} userId={localStorage.getItem('userId')}/> 
        </div>

<br />

<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
    <Button onClick={onToggleCastClick}>Toggle Actor View </Button>
</div>
<br />
{toggleCast && <Row gutter={[16, 16]} >
                {casts && casts.map((cast,index)=>(
                    <GridCards key={index}
                    castImage={cast.profile_path?`${IMAGE_BASE_URL}w500${cast.profile_path}`:null}
                    castName={cast.name}
                    />
                ))}
                </Row>}





                <Comments filterState={filterState} commentList={commentList}  postId={movieId} rerenderComponent={rerenderComponent} />
</div>
        </div>
    )
}

export default withRouter(MovieDetailPage )
