import React from 'react'
import { Col } from 'antd';

function GridCards({movieId,movieName,image,Landing,castName,castImage,castId}) {

    if(Landing && image){
        return (
            <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/movie/${movieId}`} >
                    <img style={{ width: '100%', height: '320px' }} src={image} alt={movieName} />
                </a>
            </div>
        </Col>
        )
    }else {
        if(castImage){
            return (
                <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                <a href={`/actor/${castId}`} >
                        <img style={{ width: '100%', height: '320px' }} src={castImage} alt={castName} />
                        </a>
                        <h3 style={{textAlign:'center'}}>{castName}</h3>
                </div>
            </Col>
            )
        }else {
           return null
        }
    }
}

export default GridCards
