
import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import GridCards from '../Commons/GridCards'
import MainImage from './Sections/MainImage'
import { Row , Button} from 'antd';
import axios from 'axios';


function LandingPage() {
    const [movies,setMovies] = useState([])
    const [mainImage,setMainImage] = useState('')
    const [currentPage,setCurrentPage] = useState(1)

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        axios.get(endpoint)
        .then(res => {
            setMovies([...movies,...res.data.results])
            setMainImage(res.data.results[0])
        })
    },[currentPage])


    const onLoadMoreClick = () => {
        setCurrentPage(currentPage + 1)
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
                <Button onClick={onLoadMoreClick}> Load More </Button>
            </div>
        </div>
    )
}

export default LandingPage