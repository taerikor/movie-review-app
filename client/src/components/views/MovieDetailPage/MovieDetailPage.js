import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import { List, Avatar, Row, Col, Button } from 'antd';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../Commons/GridCards';

function MovieDetailPage({match}) {
    const [movie,setMovie] =useState([])
    const [casts,setCasts] =useState([])
    const [toggleCast,setToggleCast] = useState(false)

    const {params:{movieId}} = match

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
{/* 
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  {favorite actions}
</div> */}
{/* Movie Info */}
    <MovieInfo movie={movie} />
    

<br />
{toggleCast && <Row gutter={[16, 16]} >
                {casts && casts.map((cast,index)=>(
                    <GridCards key={index}
                    castImage={cast.profile_path?`${IMAGE_BASE_URL}w500${cast.profile_path}`:null}
                    castName={cast.name}
                    />
                ))}
                </Row>}

<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
    <Button onClick={onToggleCastClick}>Toggle Actor View </Button>
</div>


<br />

        {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
    
 {/* Like DisLike Action */}

        {/* </div> */}

{/* Comments */}

</div>
        </div>
    )
}

export default withRouter(MovieDetailPage )
