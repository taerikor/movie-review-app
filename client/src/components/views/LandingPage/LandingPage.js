
import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import GridCards from '../Commons/GridCards'
import MainImage from './Sections/MainImage'
import { Row } from 'antd';


function LandingPage() {
    const [movies,setMovies] = useState([])
    const [mainImage,setMainImage] = useState('')
    const [currentPage,setCurrentPage] = useState(0)

    const fetchData = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovies([...movies,...res.results])
            setMainImage(res.results[0])
            setCurrentPage(res.page + 1)
        })
    }

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

        fetchData(endpoint)
    },[])


    const onLoadMoreClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`

        fetchData(endpoint)
    }

    return (
        <div style={{width: '100%',margin:'0'}}>
           {/* Main image */}
           {mainImage.backdrop_path&&  <MainImage 
           image={`${IMAGE_BASE_URL}w1280/${mainImage.backdrop_path}`}
           title={mainImage.title}
           description={mainImage.overview}
           movieId={mainImage.id}
           />}
            <div style={{ width: '85%', margin: '1rem auto'}}>

                <h2>Movies by latest</h2>
                <hr />
                <Row gutter={[16, 16]} >
                {movies && movies.map((movie,index)=>(
                    <GridCards key={index}
                    Landing
                    image={movie.poster_path?`${IMAGE_BASE_URL}w500${movie.poster_path}`:null}
                    movieId={movie.id}
                    movieName={movie.title}
                    />
                ))}
                </Row>

            </div>
            <div style={{ display:'flex', justifyContent: 'center'}} >
                <button onClick={onLoadMoreClick}> Load More </button>
            </div>
        </div>
    )
}

export default LandingPage